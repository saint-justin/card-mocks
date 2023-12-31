import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { generate } from 'random-words';
import { ControlButton } from '~components/atoms';
import { DialogueText } from '~components/molecules';
import { Header } from '~components/organisms';
import { Root, Body } from '~components/pages';
import { FormProps } from '~types';
import defaultForm from '~CardForms';
import IconCard from '~assets/icon-card.png';
import IconFolder from '~assets/icon-folder.png';

interface HomePageProps extends FormProps {};

const CenteredBody = styled(Body)`
  justify-content: center;
  align-items: center;
  gap: 24px;
`

const OptionButton = styled(ControlButton)`
  min-width: 250px;
  min-height: 250px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 24px;

  border: 2px solid #2D2D30;
  border-radius: 4px;
  background-color: #252526;
  transition: 0.2s;

  img {
    height: 84px;
  }

  &:hover {
    cursor: pointer; 
    background-color: #2D2D30;
  }
`

const HomePage = ({ cardForm, setForm }: HomePageProps) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  const newTemplateOnClick = () => {
    setForm({ ...defaultForm, templateName: generate(3).join('-') });
    setShowModal(!showModal);
  }

  const dialogueClose = () => { 
    setShowModal(!showModal);
  };

  const updateInputContent = (newName: string) => {
    const formCopy = { ...cardForm };
    formCopy.templateName = newName;
    setForm(formCopy);
  };

  return (
    <Root>
      <Header />

      <CenteredBody>
        <OptionButton onClick={newTemplateOnClick}>
          <h3>generate<br/>new template</h3>
          <img src={IconCard} alt='Card Icon with Plus In Center' />
        </OptionButton>
        <OptionButton onClick={() => navigate('/load')}>
          <h3>load existing<br/>template (local)</h3>
          <img src={IconFolder} alt='Card Icon with Plus In Center' />
        </OptionButton>  
      </CenteredBody>

      <DialogueText 
        visible={showModal}
        key={'homepage-control-dialogue'}
        label={'new template name:'}
        inputContent={cardForm.templateName}
        inputUpdate={updateInputContent}
        buttonContent={'continue'}
        continueAction={() => navigate('/edit')} 
        removeAction={dialogueClose} />
    </Root>
  )
}

export default HomePage;