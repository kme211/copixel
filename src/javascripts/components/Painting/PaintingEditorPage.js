import React, { Component } from "react";
import axios from "axios";
import GridBackground from "./GridBackground";
import Canvas from "./Canvas";
import styled, { css } from "styled-components";
import Inner from "../common/Inner";
import Button from "../common/Button";
import ToolBar from "./ToolBar";
import PassSection from "./PassSection";
import { EYE_DROPPER, BRUSH, COLORS, BLOCK_SIZE_PX, SECTION_SIZE_PX } from "./constants";
import { generatePixels } from "./paintingUtils";
import { toastr } from "react-redux-toastr";
import Neighbors from "./Neighbors";
const STATUS_RETRIEVING = "retrieving";
const STATUS_IN_PROGRESS = "in progress";
const STATUS_SAVING = "saving";
const STATUS_SAVED = "saved";

const canvasContainerStyles = ({
  width,
  height,
  top,
  right,
  bottom,
  left
}) => css`
  top: ${top}px;
  right: ${right}px;
  bottom: ${bottom}px;
  left: ${left}px;
  position: absolute;
  background: white;
  overflow: hidden;
  width: ${width}px;
  height: ${height}px;
  border: 1px solid #c8ccce;
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.25);
`;

const CanvasContainer = styled.div`${canvasContainerStyles}`;

const containerStyles = ({ width, height }) => css`
  position: relative;
  width: ${width}px;
  height: ${height}px;
`;

const Container = styled.div`${containerStyles}`;

const Wrapper = styled.div`
  display: flex;
`;

class PaintingEditorPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pixels: {},
      neighbors: [],
      isDrawing: false,
      isHighligting: false,
      highlightedPos: null,
      isGridOn: true,
      currentTool: BRUSH,
      currentColor: COLORS.default,
      status: STATUS_RETRIEVING,
      email: ""
    };

    this.toggleGrid = this.toggleGrid.bind(this);
    this.updateColor = this.updateColor.bind(this);
    this.updateTool = this.updateTool.bind(this);
    this.updateState = this.updateState.bind(this);
    this.saveSection = this.saveSection.bind(this);
    this.updatePassSectionForm = this.updatePassSectionForm.bind(this);
    this.passSection = this.passSection.bind(this);
    this.setCurrentColorToNeighborColor = this.setCurrentColorToNeighborColor.bind(this);
  }

  componentDidMount() {
    const token = this.props.match.params.token;
    axios
      .get(`/api/v1/section/${token}`)
      .then(res => {
        const section = res.data.section;
        this.section = section;
        const [x, y] = section.position.split(",");
        const options = {
          blockSizePx: BLOCK_SIZE_PX,
          sectionX: +x,
          sectionY: +y,
          widthPx: SECTION_SIZE_PX,
          heightPx: SECTION_SIZE_PX,
          color: COLORS.eraser
        };
        this.setState({
          pixels: generatePixels(options),
          status: STATUS_IN_PROGRESS,
          neighbors: res.data.neighbors
        });
      })
      .catch(err => {
        // show message to user and redirect
        console.error(err);
        toastr.error(
          `Oops! Can't retrieve that section. ${err.response && err.response.data ? err.response.data.message : ""}`
        );
        this.props.history.replace("/");
      });
  }

  toggleGrid() {
    this.setState({ isGridOn: !this.state.isGridOn });
  }

  updateColor(color) {
    this.setState({
      currentColor: color
    });
  }

  updateTool(tool) {
    this.setState({
      currentTool: tool
    });
  }

  updateState(newState, callback) {
    this.setState(newState, callback);
  }

  setCurrentColorToNeighborColor(e) {
    if(this.state.currentTool !== EYE_DROPPER) return;
    this.setState({
      currentColor: e.target.dataset.color,
      currentTool: BRUSH
    });
  }

  saveSection(e) {
    this.setState({ status: STATUS_SAVING });
    axios
      .post(`/api/v1/section/${this.section._id}`, { data: this.state.pixels })
      .then(res => {
        const isPaintingComplete = res.data.isPaintingComplete;
        const message = isPaintingComplete
          ? "And the painting is complete!"
          : "The painting isn't complete yet though so be sure to pass it to the next person";
        toastr.success("Your masterpiece was saved!", message);
        if (isPaintingComplete)
          return this.props.history.push(`/painting/${res.data.paintingId}`);
        this.setState({ status: STATUS_SAVED });
      })
      .catch(err => {
        toastr.error(
          "Oh, noes!",
          "We were not able to save your masterpiece. :-("
        );
      });
  }

  updatePassSectionForm(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  passSection(e) {
    e.preventDefault();
    axios
      .post(`/api/v1/painting/${this.section.painting}/send`, {
        email: this.state.email
      })
      .then(res => {
        toastr.success(
          "Request sent!",
          `Your friend at ${this.state.email} should get the email soon.`
        );
        this.props.history.push("/");
      })
      .catch(err => {
        toastr.error(
          "Oh, noes!",
          "We were not able to send the next section to your friend. :-("
        );
      });
  }

  render() {
    const {
      status,
      pixels,
      isGridOn,
      currentColor,
      currentTool,
      isDrawing,
      isHighligting,
      highlightedPos,
      neighbors
    } = this.state;
    const [x, y] = this.section
      ? this.section.position.split(",").map(parseFloat)
      : [0, 0];
    let saveButtonText;
    switch (status) {
      case STATUS_IN_PROGRESS:
        saveButtonText = "Save";
        break;
      case STATUS_SAVED:
        saveButtonText = "Saved";
        break;
      case STATUS_SAVING:
        saveButtonText = "Saving...";
        break;
      default:
    }

    const topNeighbor = neighbors.find(section =>
      new RegExp(`${x},${y - 1}`).test(section.position)
    );
    const rightNeighbor = neighbors.find(section =>
      new RegExp(`${x + 1},${y}`).test(section.position)
    );
    const bottomNeighbor = neighbors.find(section =>
      new RegExp(`${x},${y + 1}`).test(section.position)
    );
    const leftNeighbor = neighbors.find(section =>
      new RegExp(`${x - 1},${y}`).test(section.position)
    );

    return (
      <Inner>
        <h2>Editor</h2>
        {status === STATUS_SAVED &&
          <PassSection
            email={this.state.email}
            updatePassSectionForm={this.updatePassSectionForm}
            passSection={this.passSection}
          />}

        {status === STATUS_IN_PROGRESS &&
          <Wrapper>
            <Container
              width={SECTION_SIZE_PX + (leftNeighbor ? BLOCK_SIZE_PX : 0) + (rightNeighbor ? BLOCK_SIZE_PX : 0)}
              height={SECTION_SIZE_PX + (topNeighbor ? BLOCK_SIZE_PX : 0) + (bottomNeighbor ? BLOCK_SIZE_PX : 0)}
            >
              <CanvasContainer
                width={SECTION_SIZE_PX}
                height={SECTION_SIZE_PX}
                top={topNeighbor ? BLOCK_SIZE_PX : bottomNeighbor ? "auto" : "0"}
                right={rightNeighbor ? BLOCK_SIZE_PX : leftNeighbor ? "auto" : "0"}
                bottom={bottomNeighbor ? BLOCK_SIZE_PX : topNeighbor ? "auto" : "0"}
                left={leftNeighbor ? BLOCK_SIZE_PX : rightNeighbor ? "auto" : "0"}
              >
                <Canvas
                  x={x}
                  y={y}
                  height={SECTION_SIZE_PX}
                  width={SECTION_SIZE_PX}
                  interactive={true}
                  isDrawing={isDrawing}
                  isHighligting={isHighligting}
                  highlightedPos={highlightedPos}
                  pixels={pixels}
                  updateState={this.updateState}
                  currentTool={currentTool}
                  currentColor={currentColor}
                />
                {isGridOn && <GridBackground height={SECTION_SIZE_PX} width={SECTION_SIZE_PX} />}
              </CanvasContainer>
              <Neighbors
                top={topNeighbor}
                right={rightNeighbor}
                bottom={bottomNeighbor}
                left={leftNeighbor}
                centerX={x}
                centerY={y}
                onClick={this.setCurrentColorToNeighborColor}
              />
            </Container>
            <ToolBar
              isGridOn={isGridOn}
              currentTool={currentTool}
              currentColor={currentColor}
              toggleGrid={this.toggleGrid}
              updateTool={this.updateTool}
              updateColor={this.updateColor}
            />
          </Wrapper>}
        {status === STATUS_IN_PROGRESS &&
          <Button onClick={this.saveSection}>{saveButtonText}</Button>}
      </Inner>
    );
  }
}

export default PaintingEditorPage;
