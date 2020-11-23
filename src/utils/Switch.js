import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches({ paginateSwitch }) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
    paginateSwitch()
  };

  return (
    <div>
      <Switch
        checked={state.checkedB}
        onChange={handleChange('checkedB')}
        value="checkedB"
        color="primary"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
    </div>
  );
}
