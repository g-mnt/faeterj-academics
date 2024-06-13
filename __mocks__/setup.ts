import "./navigationMock";
import "./authRepositoryMock";
import "./userStoreMock";

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);