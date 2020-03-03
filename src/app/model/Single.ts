export class Single {
    name: string;
    value: number;
}

const setSingleValue = (name: string, value: number): Single => {
    return {
        name,
        value,
    };
  };

export {
    setSingleValue
  };
