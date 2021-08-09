// .test.js uses JEST by default
// enzyme allows us to render the tested component standalone
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems.js';
import NavigationItem from './NavigationItem/NavigationItem';

configure({
    adapter: new Adapter()
});


describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        // create intance of the component
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItems /> items if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    
    it('should render three <NavigationItems /> items if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should an exact logout button', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});