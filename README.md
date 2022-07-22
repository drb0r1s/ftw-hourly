<div align="center">
  <h1>Sharetribe Flex Template for Web: Updated by drb0r1s</h1>
</div>

# About
- This is the version of **Sharetribe FTW-Hourly** with new features. 
- The website called *YogaTime* has been updated with *two new features*:
  - Online/Offline Wizard Tab
  - Seats system

## Online/Offline Wizard Tab
### About

- When *creating* or *editing* a **Teacher profile**, a new Wizard Tab, called **Online/Offline**, has been added.
- The location of this tab is right between *Yoga Styles* and *Location*.

### Possibilities

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
### About

- This is a system that provides the ability to add **how many seats there are at each time slot**.
- The location where it is possible to add the number of seats is the *Availability Wizard Tab*. This means that it is possible to change the number of available seats for each time slot when editing the *Teacher profile*.

### Possibilities

- The **possibilities** provided by this new system are:
- Provider:
  - It is necessary to add the **number of free seats** when adding each new time slot, including the *exception schedule*.
  - The number of seats that can be added ranges from: **1 - 10**.
