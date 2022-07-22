import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';
import { richText } from '../../util/richText';

import css from './ListingPage.module.css';

const MIN_LENGTH_FOR_LONG_WORDS_IN_ONLINE_CLASS = 20;

const SectionClassTypesMaybe = props => {
  const { options, publicData } = props;
  const { types, onlineClass } = publicData.classTypes;

  const selectedTypes = publicData && types ? types : [];
  const selectedConfigTypes = options.filter(o => selectedTypes.find(s => s === o.key));

  if(!publicData) return null;

  return(
    <div className={css.sectionClassTypes}>
      <h2 className={css.classTypesTitle}>
        <FormattedMessage id="ListingPage.classTypesTitle" />
      </h2>
      
      <PropertyGroup
        id="ListingPage.yogaStyles"
        options={selectedConfigTypes}
        selectedOptions={selectedTypes}
        twoColumns={selectedConfigTypes.length > 5}
      />

      {types.indexOf("online") > -1 && onlineClass && <>
        <strong>
            <FormattedMessage id="ListingPage.classTypesOnlineClassTitle" />
        </strong>
        
        <p className={css.onlineClass}>
            {richText(onlineClass, {
            longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_ONLINE_CLASS,
            longWordClass: css.longWord,
            })}
        </p>
      </>}
    </div>
  );
};

export default SectionClassTypesMaybe;
