import { TestComponent } from '@components/TestComponent/TestComponent';
import * as ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TestComponent />, div);
});
