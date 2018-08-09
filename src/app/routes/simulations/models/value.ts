export class Value {
  name: string;
  value: string;

  public static updateValueArray(
    valueArray: Value[],
    valueObject: Value,
  ): void {
    let valueIndex = valueArray.findIndex(
      obj => obj['name'] === valueObject.name,
    );
    // maintain an array of Value objects in job.values
    if (valueIndex > -1) {
      // replace the value if it exsists
      valueArray[valueIndex] = valueObject;
    } else {
      // push the value if it doesn't
      valueArray.push(valueObject);
    }
  }
}

export function generateMockValue(): Value {
  return {
    name: 'Example_value',
    value: '10.3',
  };
}
