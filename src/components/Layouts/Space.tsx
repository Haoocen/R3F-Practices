import styled from 'styled-components';
import React from "react";

export const Space = styled.div<{width?:number,height?: number}>`
  flex-grow: 0;
  flex-shrink: 0;
  ${props => {
    if (props.width) {
        return `flex-basis: ${props.width}px; min-width: ${props.width}px; height: 0;`;
    }
    if (props.height) {
        return `flex-basis: ${props.height}px; min-height: ${props.height}px; width: 0;`;
    }
    return '';
}}
`;