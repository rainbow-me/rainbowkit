import React from 'react';

const props = ['balance', 'ensName', 'ensAvatar', 'transactions'];

const style: React.CSSProperties = {
  textAlign: 'center',
  verticalAlign: 'middle',
};

interface ResponsiveRpcSettingsProps {
  onChange: (
    value: string,
    type: 'smallScreen' | 'largeScreen',
    checkStatus: boolean,
  ) => void;
  values: Record<string, { largeScreen: boolean; smallScreen: boolean }>;
}

const ResponsiveRpcSettings = ({
  onChange,
  values,
}: ResponsiveRpcSettingsProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>smallScreen</th>
          <th>largeScreen</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => {
          return (
            <tr key={prop} style={style}>
              <td>
                <p>{prop}</p>
              </td>
              <td>
                <input
                  checked={values[prop]?.smallScreen}
                  id={prop}
                  onChange={(e) => {
                    onChange(prop, 'smallScreen', e.target.checked);
                  }}
                  type="checkbox"
                />
              </td>
              <td>
                <input
                  checked={values[prop]?.largeScreen}
                  id={prop}
                  onChange={(e) => {
                    onChange(prop, 'largeScreen', e.target.checked);
                  }}
                  type="checkbox"
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResponsiveRpcSettings;
