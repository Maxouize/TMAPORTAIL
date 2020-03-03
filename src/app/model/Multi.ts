import { Single } from './Single';

export class Multi {
    name: string;
    series: Single[];
}

const setMultiValue = (name: string, series: Single[]): Multi => {
    return {
        name,
        series,
    };
  };

export {
  setMultiValue
};
