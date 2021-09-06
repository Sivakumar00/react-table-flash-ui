import Table from '@components/Table/Table';
import generateMock, { columns } from 'stories/__mocks__/generateMock';
import * as ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const data = generateMock(20);
  ReactDOM.render(<Table data={data} columns={columns} />, div);
});
