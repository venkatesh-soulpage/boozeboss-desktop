/**
 *
 * ClientContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectIsLoading,
  makeSelectVenuedata,
  makeSelectEventdata,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Table } from 'rsuite';

import { getVenueStatistics } from './actions';
import { Button, Loader } from 'rsuite';
import styled from 'styled-components';
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  margin: 0 2em 2em 2em;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2em 2em 0 2em;
`;

const Columndiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-self: flex-start;
  position: sticky;
  top: 1em;
  z-index: 99;
`;

const List = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 0.5em 0.5em 0.5em;
`;

const MessageLabel = styled.p`
  font-family: Roboto;
  font-size: 1.25em;
  margin: 1em;
`;

/* eslint-disable react/prefer-stateless-function */
export class Statistics extends React.Component {
  state = {
    openVenueTable: true,
  };
  componentDidMount = () => {
    const { getVenueData } = this.props;
    getVenueData();
  };

  render() {
    if (!this.props.venueData) {
      return <Loader />;
    }
    const { Column, HeaderCell, Cell, Pagination } = Table;
    return (
      <div>
        <Helmet>
          <title>Statistics</title>
          <meta name="description" content="Statistics of Event and Venue" />
        </Helmet>
        <StyledContainer>
          <Columndiv>
            <List>
              <Button
                style={{ margin: '0 0 1em 0', width: '100%' }}
                color="green"
                onClick={() => {
                  this.setState({
                    openVenueTable: true,
                  });
                }}
              >
                Venue Count
              </Button>
              <Button
                style={{ margin: '0 0 1em 0', width: '100%' }}
                color="green"
                onClick={() => {
                  this.setState({
                    openVenueTable: false,
                  });
                }}
              >
                Event Count
              </Button>
            </List>
          </Columndiv>
          <InfoContainer>
            {this.state.openVenueTable ? (
              <Table
                virtualized
                height={400}
                width={600}
                data={this.props.venueData}
                onRowClick={data => {}}
              >
                <Column width={70} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={130}>
                  <HeaderCell>Venue Name</HeaderCell>
                  <Cell dataKey="venueName" />
                </Column>

                <Column width={100}>
                  <HeaderCell>Venue Address</HeaderCell>
                  <Cell dataKey="address" />
                </Column>

                <Column width={100}>
                  <HeaderCell>Count</HeaderCell>
                  <Cell dataKey="scannedCount" />
                </Column>
              </Table>
            ) : (
              <Table
                virtualized
                height={400}
                width={600}
                data={this.props.eventData}
                onRowClick={data => {}}
              >
                <Column width={70} align="center" fixed>
                  <HeaderCell>Id</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={130}>
                  <HeaderCell>Event Name</HeaderCell>
                  <Cell dataKey="eventName" />
                </Column>

                <Column width={130}>
                  <HeaderCell>Event Start Time</HeaderCell>
                  <Cell dataKey="startTime" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Count</HeaderCell>
                  <Cell dataKey="scannedCount" />
                </Column>
              </Table>
            )}
          </InfoContainer>
        </StyledContainer>
      </div>
    );
  }
}

Statistics.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
  isLoading: makeSelectIsLoading(),
  venueData: makeSelectVenuedata(),
  eventData: makeSelectEventdata(),
});

function mapDispatchToProps(dispatch) {
  return {
    getVenueData: () => dispatch(getVenueStatistics()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'statistics', reducer });
const withSaga = injectSaga({ key: 'statistics', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Statistics);
