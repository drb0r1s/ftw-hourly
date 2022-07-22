<div align="center">
  <h1>Sharetribe Flex Template for Web: Updated by drb0r1s</h1>
</div>

# About
- This is the version of **Sharetribe FTW-Hourly** with new features. 
- The website called *YogaTime* has been updated with *two new features*:
  - Online/Offline Wizard Tab
  - Seats system

## Online/Offline Wizard Tab
- When *creating* or *editing* a **Teacher profile**, a new Wizard Tab, called **Online/Offline**, has been added.
- The location of this tab is right between *Yoga Styles* and *Location*.
- The **possibilities** provided by this new Wizard Tab are:
  - The user can add information about whether he offers classes *online* and/or *offline*.<br />
  **INFO:** Without this information it is not possible to proceed further.
  - If the user selects the option of providing *online* classes, an input appears in which it is **necessary** to explain how the online classes will be provided.
  - After the user adds this information, it will be *displayed on the profile*.

### Development
Location of the files:
```
└── src
    └── components
        └── EditListingClassTypesPanel
    └── forms
        └── EditListingClassTypesForm
```

## Seats system
- This is a system that provides the ability to add **how many seats there are at each time slot**.
- The location where it is possible to add the number of seats is the *Availability Wizard Tab*. This means that it is possible to change the number of available seats for each time slot when editing the *Teacher profile*.
