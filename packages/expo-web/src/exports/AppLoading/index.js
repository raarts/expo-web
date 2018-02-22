import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class AppLoading extends React.Component {
  _isMounted: boolean;

  componentDidMount() {
    this._isMounted = true;

    // startAsync is optional, you can do this process manually if you prefer (this is mainly for
    // backwards compatibility and it is not recommended)
    if (this.props.startAsync) {
      this._startLoadingAppResourcesAsync().catch(error => {
        console.error(`AppLoading threw an unexpected error when loading:\n${error.stack}`);
      });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _startLoadingAppResourcesAsync = async () => {
    if (!this.props.onFinish) {
      throw new Error('AppLoading onFinish prop is required if startAsync is provided');
    }

    try {
      await this.props.startAsync();
    } catch (e) {
      if (!this._isMounted) return;

      if (this.props.onError) {
        this.props.onError(e);
      } else {
        throw e;
      }
    } finally {
      // If we get to this point then we know that either there was no error, or the error was
      // handled.
      if (this._isMounted && this.props.onFinish) {
        this.props.onFinish();
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

AppLoading.propTypes = {
  onError: PropTypes.func,
  onFinish: PropTypes.func,
  startAsync: PropTypes.func
};
