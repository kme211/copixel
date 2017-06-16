import React from "react";
import Input from '../../../components/Input';
import SubmitButton from '../../../components/SubmitButton';

const PassSection = ({ email, updatePassSectionForm, passSection }) => (
  <div>
    <h3>Pass the next section!</h3>
    <form>
      <Input 
        onChange={updatePassSectionForm} 
        label="Email" 
        type="email" 
        placeholder="email" 
        name="email"
        value={email}
      />
      <SubmitButton onClick={passSection} value="Pass"/>
    </form>
  </div>
);

export default PassSection;