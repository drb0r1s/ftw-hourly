import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';

import css from './BookingBreakdown.module.css';

const LineItemUnitPriceMaybe = props => {
  const { transaction, unitType, specialUnitType, intl } = props;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const translationKey = isNightly
    ? 'BookingBreakdown.pricePerNight'
    : isDaily
    ? 'BookingBreakdown.pricePerDay'
    : 'BookingBreakdown.pricePerQuantity';

  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  /*
    drb0r1s:
    Each constant containing the prefix "special" serves to obtain and represent the price of seats,
    based on the special unit type.
  */
  
  const specialUnitPurchase = transaction.attributes.lineItems.find(
    item => item.code === specialUnitType && !item.reversal
  );

  const formattedUnitPrice = unitPurchase ? formatMoney(intl, unitPurchase.unitPrice) : null;
  const specialFormattedUnitPrice = specialUnitPurchase ? formatMoney(intl, specialUnitPurchase.unitPrice) : null;

  return formattedUnitPrice ? (
    <>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id={translationKey} />
        </span>
        <span className={css.itemValue}>{formattedUnitPrice}</span>
      </div>
      <div className={css.lineItem}>
        <span className={css.itemLabel}>
          <FormattedMessage id='BookingBreakdown.pricePerSeat' />
        </span>
        <span className={css.itemValue}>{specialFormattedUnitPrice}</span>
      </div>
    </>
  ) : null;
};

LineItemUnitPriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemUnitPriceMaybe;
