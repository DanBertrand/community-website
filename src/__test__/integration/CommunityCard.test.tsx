import { render, RenderResult } from '@testing-library/react';
import CommunityCard from '../../pages/home/CommunityCard';

let documentBody: RenderResult;
describe('<CommunityCard />', () => {
    beforeEach(() => {
        documentBody = render(<CommunityCard id={1} name="Berlin Community" address="Seestrasse 114, 13353 Berlin" />);
    });
    it('shows name', () => {
        expect(documentBody.getByText('Berlin Community')).toBeInTheDocument();
    });
    it('shows address', () => {
        expect(documentBody.getByText('Seestrasse 114, 13353 Berlin')).toBeInTheDocument();
    });
});
