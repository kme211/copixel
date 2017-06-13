import { generatePixels, getCoords, getLocalCoords } from '../src/javascripts/components/Painting/paintingUtils.js';

test('generates pixels correctly for pos: 0,0', () => {
  const options = {
    sectionX: 0,
    sectionY: 0,
    color: '#ffffff',
    widthPx: 2,
    heightPx: 2,
    blockSizePx: 1
  };
  expect(generatePixels(options)).toEqual({
    '0,0': '#ffffff',
    '0,1': '#ffffff',
    '1,0': '#ffffff',
    '1,1': '#ffffff'
  });
});

test('generates pixels correctly for pos: 20,20', () => {
  const options = {
    sectionX: 20,
    sectionY: 20,
    color: '#000000',
    widthPx: 2,
    heightPx: 2,
    blockSizePx: 1
  };

  expect(generatePixels(options)).toEqual({
    '20,20': '#000000',
    '20,21': '#000000',
    '21,20': '#000000',
    '21,21': '#000000'
  });
})

test('should get block coords relative to section position: 1,0', () => {
  const event1 = {
    nativeEvent: {
      offsetX: 0,
      offsetY: 0
    }
  };

  expect(getCoords(1, 0, event1)).toEqual([300,0]);

  const event2 = {
    nativeEvent: {
      offsetX: 31,
      offsetY: 53
    }
  };

  expect(getCoords(1, 0, event2)).toEqual([320,40]);

  const event3 = {
    nativeEvent: {
      offsetX: 1,
      offsetY: 1
    }
  };

  expect(getCoords(1, 0, event3)).toEqual([300,0]);
});

test('should get block coords relative to section position: 0,0 for mouse position: 0,0', () => {
  const event = {
    nativeEvent: {
      offsetX: 0,
      offsetY: 0
    }
  };

  expect(getCoords(0, 0, event)).toEqual([0,0]);
});

test('should get block coords relative to section position: 0,0 for mouse position: 25,25', () => {
  const event = {
    nativeEvent: {
      offsetX: 25,
      offsetY: 25
    }
  };

  expect(getCoords(0, 0, event)).toEqual([20,20]);
});

test('getLocalCoords should take the painting coords and return the local section coords', () => {
  expect(getLocalCoords(0, 0, 0, 0)).toEqual([0, 0]);
  expect(getLocalCoords(20, 20, 0, 0)).toEqual([20, 20]);
  expect(getLocalCoords(320, 320, 1, 1)).toEqual([20, 20]);
  expect(getLocalCoords(300, 0, 1, 0)).toEqual([0, 0]);
})