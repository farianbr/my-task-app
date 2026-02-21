"use client";
import { useGlobalState } from "@/app/context/globalProviders";

import React from "react";
import styled from "styled-components";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  border?: string;
  color?: string;
  isLoading?: boolean;
}

function Button({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color,
  isLoading = false,
}: Props) {
  const { theme } = useGlobalState();

  return (
    <ButtonStyled
      type={type}
      style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        borderRadius: borderRad || "0.5rem",
        fontWeight: fw || "500",
        fontSize: fs,
        border: border || "none",
        color: color || theme.colorGrey0,
      }}
      theme={theme}
      onClick={click}
      disabled={isLoading}
      $isLoading={isLoading}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon && icon}
          {name}
        </>
      )}
    </ButtonStyled>
  );
}

const Spinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ButtonStyled = styled.button<{ $isLoading: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  cursor: ${(props) => (props.$isLoading ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};
  transition: all 0.55s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover:not(:disabled) {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default Button;
