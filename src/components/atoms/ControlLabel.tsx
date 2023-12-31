import * as React from 'react';
import styled from 'styled-components';

interface ControlLabelProps {
  label: string;
  removeable?: boolean;
}

const ControlLabelContainer = styled.div`
  h2 { font-weight: 200; }
  hr { background-color: #3E3E42; }
`;

const ControlLabel = ({label}: ControlLabelProps) => {
  return (
    <ControlLabelContainer>
      <h2>{label.toLocaleLowerCase()}</h2>
      <hr />
    </ControlLabelContainer>
  );
}

export default ControlLabel;