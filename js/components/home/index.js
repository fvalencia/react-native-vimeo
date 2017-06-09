
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import { Container, Header, Title, Content, Text, Button, Icon, Left, Body, Right, View } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';


class Home extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    setIndex: React.PropTypes.func,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
  }

  newPage(index) {
    this.props.setIndex(index);
    Actions.blankPage();
  }

  /*
    <Left>
    <Button transparent>
      <Icon active name="power" />
    </Button>
  </Left>
  */

  render() {
    return (
      <Container style={styles.container}>
        <View style={styles.container}>
          <Header>
            <Left>
            </Left>
            <Body>  
              <Title>{(this.props.name) ? this.props.name : 'Home'}</Title>
            </Body>

            <Right>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon active name="menu" />
              </Button>
            </Right>
          </Header>

          <Content>
            <Grid style={styles.mt}>
              {this.props.list.map((item, i) =>
                <Row key={i}>
                  <TouchableOpacity
                    style={styles.row}
                    onPress={() => this.newPage(i)}
                  >
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                </Row>
              )}
            </Grid>
          </Content>
        </View>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list,
});

export default connect(mapStateToProps, bindAction)(Home);
