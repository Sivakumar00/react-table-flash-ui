import { helpers } from 'faker';

export interface IUserData extends Faker.UserCard, Record<string, unknown> {
  subRows?: IUserData[];
}

export const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'User Name',
        accessor: 'username',
      },
    ],
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'City',
        accessor: 'address.city',
        align: 'left',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        align: 'right',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Website',
        accessor: 'website',
      },
    ],
  },
];

const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Faker.UserCard => {
  return helpers.userCard();
};

export default function generateMock(...lens: number[]) {
  const makeDataLevel = (depth = 0): IUserData[] => {
    const len = lens[depth];
    return range(len).map((d) => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
