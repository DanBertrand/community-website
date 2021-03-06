import React from 'react';
import ReactDOM from 'react-dom';

import { Dropdown } from 'components/Dropdown';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const children = ['Community', 'Chill Nirvana', 'Baobab'].map((title, index) => (
        <option key={index}>{title}</option>
    ));
    ReactDOM.render(<Dropdown handleSelect={() => console.log('CLick')}>{children}</Dropdown>, div);
});
