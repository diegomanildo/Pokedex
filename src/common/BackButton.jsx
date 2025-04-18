import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconArrowNarrowLeftDashed } from '@tabler/icons-react';

const BackButton = ({ path = -1 }) => {
  const navigate = useNavigate();

  return (
    <button className="btn btn-secondary" onClick={() => navigate(path)}>
      <IconArrowNarrowLeftDashed stroke={2} />
    </button>
  );
};

export default BackButton;
