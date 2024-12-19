install:
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm i react-native-linear-gradient
npm i @react-native-community/blur
npm i lottie-react-native
npm i react-native-vector-icons
npm i --save-dev @types/react-native-vector-icons
npm i zustand
npm i immer
npm i @react-native-async-storage/async-storage

// install splash screen
npm i react-native-splash-screen

// clean android
cd android
./gradlew clean

// link asset vào theme:
npx react-native-asset
