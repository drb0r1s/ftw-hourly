import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';

import css from './BookingBreakdown.module.css';

const LineItemBasePriceMaybe = props => {
  const { transaction, unitType, specialUnitType, intl } = props;
  const isNightly = unitType === LINE_ITEM_NIGHT;
  const isDaily = unitType === LINE_ITEM_DAY;
  const translationKey = isNightly
    ? 'BookingBreakdown.baseUnitNight'
    : isDaily
    ? 'BookingBreakdown.baseUnitDay'
    : 'BookingBreakdown.baseUnitQuantity';

  // Find correct line-item for given unitType prop.
  // It should be one of the following: 'line-item/night, 'line-item/day', 'line-item/units', or 'line-item/time'
  // These are defined in '../../util/types';
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

  const quantity = unitPurchase ? unitPurchase.quantity.toString() : null;
  const unitPrice = unitPurchase ? formatMoney(intl, unitPurchase.unitPrice) : null;
  const total = unitPurchase ? formatMoney(intl, unitPurchase.lineTotal) : null;

  const specialQuantity = specialUnitPurchase ? specialUnitPurchase.quantity.toString() : null;
  const specialTotal = specialUnitPurchase && specialQuantity > 0 ? formatMoney(intl, specialUnitPurchase.lineTotal) : null;

  const { Money } = sdkTypes;

  const calcFinalTotal = total && specialTotal ? new Money(unitPurchase.lineTotal.amount + (specialQuantity > 0 ? specialUnitPurchase.lineTotal.amount : 0), unitPurchase.lineTotal.currency) : null;
  const finalTotal = calcFinalTotal ? formatMoney(intl, calcFinalTotal) : null;

  return quantity && total ? (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={translationKey} values={{ unitPrice, quantity, specialQuantity }} />
      </span>
      <span className={css.itemValue}>{finalTotal}</span>
    </div>
  ) : null;
};

LineItemBasePriceMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemBasePriceMaybe;
