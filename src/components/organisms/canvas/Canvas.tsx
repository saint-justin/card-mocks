import * as React from 'react';
import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Draw from '~components/organisms/canvas/Draw';
import { CardForm } from '~types';

interface CanvasProps {
  cardForm: CardForm;
}

const CanvasContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 100px;
  min-height: 300px;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Canvas = ({cardForm: form}: CanvasProps): JSX.Element => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const render = () => {
    const parentRect = canvas.current!.parentElement?.getBoundingClientRect() as DOMRect;
    canvas.current!.height = parentRect.height;
    canvas.current!.width = parentRect.width;

    if (!canvas.current) throw new Error("Invalid canvas context");
    Draw(form, canvas.current.getContext('2d') as CanvasRenderingContext2D);
  }

  useEffect(() => {
    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render)
  });

  return(
    <CanvasContainer>
      <canvas ref={canvas} />
    </CanvasContainer>
  )
}

export default Canvas;