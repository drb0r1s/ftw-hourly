import React, { useState } from 'react';
import { compose } from 'redux';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { maxLength, required, composeValidators } from '../../util/validators';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Form, Button, FieldTextInput, FieldCheckboxGroup } from '../../components';

import css from './EditListingClassTypesForm.module.css';

const EditListingClassTypesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        initialValues,
        disabled,
        ready,
        rootClassName,
        className,
        handleSubmit,
        intl,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;

      const types = initialValues && initialValues.types ? initialValues.types : [];

      /*
        drb0r1s:
        The purpose of using useState here is to control the state the checkboxes are in.
        This is necessary to be able to track whether the "onlineClass" input needs to be displayed at the same time.
      */
      
      const [checkboxHandler, setCheckboxHandler] = useState({ online: types.indexOf("online") > -1, offline: types.indexOf("offline") > -1 });

      const classes = classNames(rootClassName || css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = disabled || submitInProgress || (!checkboxHandler.online && !checkboxHandler.offline);

      const onlineClassTitle = intl.formatMessage({ id: 'EditListingClassTypesForm.onlineClassTitle' });
      const onlineClassPlaceholder = intl.formatMessage({ id: 'EditListingClassTypesForm.onlineClassPlaceholder' });

      const onlineClassTitleRequired = intl.formatMessage({ id: 'EditListingClassTypesForm.onlineClassTitleRequired' });
      
      const ONLINE_CLASS_MAX_LENGTH = 100;
      const maxLengthMessage = intl.formatMessage({ id: 'EditListingClassTypesForm.maxLength' }, { maxLength: ONLINE_CLASS_MAX_LENGTH });
      const maxLength100Message = maxLength(maxLengthMessage, ONLINE_CLASS_MAX_LENGTH);

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingClassTypesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingClassTypesForm.showListingFailed" />
        </p>
      ) : null;

      const options = findOptionsForSelectFilter('classTypes', filterConfig);
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}
          
          {/*
            drb0r1s:
            The prop "setCheckboxHandler" using the propDrilling method will be called every time the checkbox is pressed
            and in that way it will set the opposite value from the one currently in the "checkboxHandler" state.
          */}
          
          <FieldCheckboxGroup
            className={css.classType}
            id="types"
            name="types"
            options={options}
            setCheckboxHandler={option => setCheckboxHandler({...checkboxHandler, [option]: option === "online" ? !checkboxHandler.online : !checkboxHandler.offline})}
          />

          {checkboxHandler.online && <FieldTextInput
            id="onlineClass"
            name="onlineClass"
            type="text"
            label={onlineClassTitle}
            placeholder={onlineClassPlaceholder}
            maxLength={ONLINE_CLASS_MAX_LENGTH}
            validate={composeValidators(required(onlineClassTitleRequired), maxLength100Message)}
            autoFocus
          />}

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingClassTypesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditListingClassTypesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  onSubmit: func.isRequired,
  intl: intlShape.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

const EditListingClassTypesForm = EditListingClassTypesFormComponent;

export default compose(injectIntl)(EditListingClassTypesForm);
