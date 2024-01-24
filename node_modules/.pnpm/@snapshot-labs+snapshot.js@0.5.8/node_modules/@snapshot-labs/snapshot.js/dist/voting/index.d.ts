import singleChoice from './singleChoice';
import approval from './approval';
import quadratic from './quadratic';
import rankedChoice from './rankedChoice';
import weighted from './weighted';
declare const _default: {
    'single-choice': typeof singleChoice;
    approval: typeof approval;
    quadratic: typeof quadratic;
    'ranked-choice': typeof rankedChoice;
    weighted: typeof weighted;
    basic: typeof singleChoice;
};
export default _default;
