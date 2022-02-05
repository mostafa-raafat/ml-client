import { useEffect } from 'react';
import PropTypes from 'prop-types';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Divider } from '@mui/material';
// config
import { FLOW } from 'Config/index';
// guards
import AuthGuard from 'Guards/AuthGuard';
//
import FlowLayoutContent from './content';
import FlowLayoutHeader from './header';

// ----------------------------------------------------------------------

FlowLayout.propTypes = {
  children: PropTypes.node,
  props: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  manager: PropTypes.shape({
    visitedSteps: PropTypes.arrayOf(PropTypes.bool).isRequired,
    stepIndex: PropTypes.number.isRequired,
    setActiveStep: PropTypes.func.isRequired,
  }).isRequired,
};

// ----------------------------------------------------------------------

export default function FlowLayout({
  children,
  props: { labels } = { labels: [] },
  manager: { visitedSteps, stepIndex, setActiveStep },
}) {
  const { asPath, push } = useRouter();

  const routeHash = asPath.match(/#([a-z0-9]+)/gi);
  const hash = routeHash ? routeHash[0].substring(1) : null;
  const stepIndexHash = labels[stepIndex].replace(/\s+/g, '-').toLowerCase();
  const activeStepIndex = routeHash
    ? labels.findIndex((label) => label.replace(/\s+/g, '-').toLowerCase() === hash)
    : -1;

  useEffect(() => {
    if (!routeHash) {
      push({
        hash: stepIndexHash,
      });
    }
    if (activeStepIndex !== -1 && hash !== stepIndexHash && visitedSteps[stepIndex] === true) {
      push({
        hash: stepIndexHash,
      });
    }
  }, [stepIndex]);

  useEffect(() => {
    if (activeStepIndex !== -1 && hash !== stepIndexHash && visitedSteps[activeStepIndex] === true) {
      setActiveStep(activeStepIndex);
    }
  }, [hash]);

  return (
    <>
      <Container>
        <FlowLayoutHeader
          visitedSteps={visitedSteps}
          setActiveStep={setActiveStep}
          stepIndex={stepIndex}
          labels={labels}
        />
        <FlowLayoutContent>{children}</FlowLayoutContent>
      </Container>
      <Divider sx={{ position: 'absolute', top: FLOW.MAIN_HEADER, width: '100%' }} />
    </>
  );
}
