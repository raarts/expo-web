/* eslint-env jasmine, jest */

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import createSerializer from '../../packages/expo-web/jest/createSerializer';
import { StyleSheet } from 'react-native';

const serializer = createSerializer(StyleSheet);

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(serializer);
