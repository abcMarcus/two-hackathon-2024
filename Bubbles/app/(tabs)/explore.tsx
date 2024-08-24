// // // import React from 'react';
// // // import { StyleSheet, View, Text, Image } from 'react-native';

// // // export default function ProfileScreen() {
// // //   return (
// // //     <View style={styles.container}>
// // //       <Image
// // //         source={{ uri: 'https://via.placeholder.com/160' }} // Placeholder image URL
// // //         style={styles.profileImage}
// // //       />
// // //       <Text style={styles.name}>John Doe</Text>
// // //       <View style={styles.detailsContainer}>
        
// // //         <Text style={styles.city}>
// // //           New York City placeholderText
// // //         </Text>
// // //         <Text style={styles.connections}>
// // //           150 <Text style={styles.label}>connections</Text>
// // //         </Text>
// // //       </View>
// // //     </View>
// // //   );
// // // }
// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     // justifyContent: 'center',
// // //     alignItems: 'center',
// // //     paddingTop: 110, // Adjust the padding to position the profile picture near the top
// // //   },
// // //   profileImage: {
// // //     width: 160,
// // //     height: 160,
// // //     borderRadius: 80, // Circular frame
// // //     marginBottom: 20,
// // //   },
// // //   name: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     marginBottom: 10,
// // //   },
// // //   detailsContainer: {
// // //     alignItems: 'center',
// // //   },
// // //   connections: {
// // //     fontSize: 16,
// // //     color: '#555',
// // //     marginBottom: 5, // Space between connections and city
// // //   },
// // //   city: {
// // //     fontSize: 16,
// // //     color: '#555',
// // //     flexWrap: 'wrap', // Allow text to wrap
// // //     textAlign: 'center', // Center the text horizontally
// // //     marginBottom: 5, // Space between connections and city
// // //   },
// // //   label: {
// // //     fontSize: 16,
// // //     fontWeight: 'normal',
// // //     color: '#777',
// // //   },
// // // });



// // import React from 'react';
// // import { StyleSheet, View, Text, Image } from 'react-native';

// // export default function ProfileScreen() {
// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.header}>
// //         <Text style={styles.profileLabel}>Profile</Text>
// //         <Text style={styles.name}>John Doe</Text>
// //       </View>
// //       <Image
// //         source={{ uri: 'https://via.placeholder.com/160' }} // Placeholder image URL
// //         style={styles.profileImage}
// //       />
// //       <View style={styles.detailsContainer}>
// //         <Text style={styles.city}>
// //           New York City placeholderText
// //         </Text>
// //         <Text style={styles.connections}>
// //           150 <Text style={styles.label}>connections</Text>
// //         </Text>
// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     paddingTop: 110, // Adjust the padding to position the profile picture near the top
// //   },
// //   header: {
// //     position: 'absolute',
// //     top: 20,
// //     left: 20,
// //   },
// //   profileLabel: {
// //     fontSize: 25,
// //     color: '#888', // Grey color
// //     fontWeight: 'normal',
// //   },
// //   name: {
// //     fontSize: 24,
// //     color: '#000', // Black color
// //     fontWeight: 'bold',
// //     marginTop: 5, // Space between "Profile" and name
// //   },
// //   profileImage: {
// //     width: 160,
// //     height: 160,
// //     borderRadius: 80, // Circular frame
// //     marginBottom: 20,
// //   },
// //   detailsContainer: {
// //     alignItems: 'center',
// //   },
// //   connections: {
// //     fontSize: 16,
// //     color: '#555',
// //     marginBottom: 5, // Space between connections and city
// //   },
// //   city: {
// //     fontSize: 16,
// //     color: '#555',
// //     flexWrap: 'wrap', // Allow text to wrap
// //     textAlign: 'center', // Center the text horizontally
// //     marginBottom: 5, // Space between connections and city
// //   },
// //   label: {
// //     fontSize: 16,
// //     fontWeight: 'normal',
// //     color: '#777',
// //   },
// // });

// import React from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import { ThemedText } from '@/components/ThemedText'; // Import ThemedText
// import { ThemedView } from '@/components/ThemedView'; // Import ThemedView

// export default function ProfileScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <View style={styles.header}>
//         <ThemedText type="title" style={styles.profileLabel}>
//           Profile
//         </ThemedText>
//         <ThemedText type="title" style={styles.name}>
//           John Doe
//         </ThemedText>
//       </View>
//       <Image
//         source={{ uri: 'https://via.placeholder.com/160' }} // Placeholder image URL
//         style={styles.profileImage}
//       />
//       <View style={styles.detailsContainer}>
//         <ThemedText type="body" style={styles.city}>
//           New York City placeholderText
//         </ThemedText>
//         <ThemedText type="body" style={styles.connections}>
//           150 <ThemedText type="body" style={styles.label}>connections</ThemedText>
//         </ThemedText>
//       </View>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 110, // Adjust the padding to position the profile picture near the top
//   },
//   header: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//   },
//   profileLabel: {
//     fontStyle: 'normal',
//     paddingLeft: 20,
//   },
//   name: {
//     fontStyle: 'italic',
//     paddingLeft: 20,
//     marginTop: 5, // Space between "Profile" and name
//   },
//   profileImage: {
//     width: 160,
//     height: 160,
//     borderRadius: 80, // Circular frame
//     marginBottom: 20,
//   },
//   detailsContainer: {
//     alignItems: 'center',
//   },
//   connections: {
//     fontStyle: 'normal',
//     color: '#555',
//     marginBottom: 5, // Space between connections and city
//   },
//   city: {
//     fontStyle: 'normal',
//     color: '#555',
//     flexWrap: 'wrap', // Allow text to wrap
//     textAlign: 'center', // Center the text horizontally
//     marginBottom: 5, // Space between connections and city
//   },
//   label: {
//     fontStyle: 'normal',
//     color: '#777',
//   },
// });

// import React, { useState } from 'react';
// import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, Image, Platform, TouchableOpacity  } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import Bubble from '@/components/Bubble';
// import ChatInput from '@/components/ChatInput';
// import { useNavigation } from '@react-navigation/native';

// export default function ProfileScreen() {
//   return (
//     <TouchableWithoutFeedback>
//       <ThemedView style={styles.container}>
//         <ThemedText type="title" style={styles.greeting}>
//           Profile
//         </ThemedText>
//         <ThemedText type="title" style={styles.username}>
//           John Doe
//         </ThemedText>
//         {/* <Image
//           source={{ uri: 'https://via.placeholder.com/160' }} // Placeholder image URL
//           style={styles.profileImage}
//         /> */}
//       </ThemedView>
      
//     </TouchableWithoutFeedback>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: 'flex-start',
//     paddingTop: 50,
//     position: 'relative', // Ensure proper positioning of children
//   },
//   greeting: {
//     fontStyle: 'normal',
//     color:'#999',
//     paddingLeft: 20,
//   },
//   username: {
//     fontStyle: 'normal',
//     paddingLeft: 20,
//   },
//   profileLabel: {
//     fontStyle: 'normal',
//     paddingLeft: 20,
//   },
//   name: {
//     fontStyle: 'italic',
//     paddingLeft: 20,
//     marginTop: 5, // Space between "Profile" and name
//   },
//   profileImage: {
//     width: 160,
//     height: 160,
//     borderRadius: 80, // Circular frame
//     marginBottom: 20,
//   },
//   detailsContainer: {
//     alignItems: 'center',
//   },
//   connections: {
//     fontStyle: 'normal',
//     color: '#555',
//     marginBottom: 5, // Space between connections and city
//   },
//   city: {
//     fontStyle: 'normal',
//     color: '#555',
//     flexWrap: 'wrap', // Allow text to wrap
//     textAlign: 'center', // Center the text horizontally
//     marginBottom: 5, // Space between connections and city
//   },
//   label: {
//     fontStyle: 'normal',
//     color: '#777',
//   },
// });






// import React from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';


// export default function ProfileScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <View style={styles.header}>
//         <ThemedText type="title" style={styles.profileLabel}>
//           Profile
//         </ThemedText>
//         <ThemedText type="title" style={styles.name}>
//           John Doe
//         </ThemedText>
//       </View>
//       <View style={styles.profileSection}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/170' }} // Placeholder image URL
//           style={styles.profileImage}
//         />
//         <View style={styles.detailsContainer}>
//           <ThemedText type="body" style={styles.city}>
//             New York City placeholder_text
//           </ThemedText>
//           <ThemedText type="body" style={styles.connections}>
//             150 <ThemedText type="body" style={styles.label}>connections</ThemedText>
//           </ThemedText>
//         </View>
//       </View>
//       <Collapsible title="Interests">

//       <View style={styles.detailsContainer}>
//           <ThemedText type="body" style={styles.interests}>
//             - Basketball
//           </ThemedText>
//           <ThemedText type="body" style={styles.interests}>
//             - Running
//           </ThemedText>
//         </View>

//     </Collapsible>
//     <Collapsible title="Languages Spoken">

//       <View style={styles.detailsContainer}>
//           <ThemedText type="body" style={styles.interests}>
//             - English
//           </ThemedText>
//           <ThemedText type="body" style={styles.interests}>
//             - talian
//           </ThemedText>
//         </View>

//     </Collapsible>
//     </ThemedView>
    
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     paddingTop: 0, // Adjust the padding to position content from the top
//   },
//   header: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//   },
//   profileLabel: {
//     fontStyle: 'normal',
//     color: '#999',
//     // paddingLeft: 20,
//   },
//   name: {
//     fontStyle: 'normal',
//     // paddingLeft: 20,
//     marginTop: 5, // Space between "Profile" and name
//   },
//   profileSection: {
//     flex: 1,
//     paddingTop: 170,
//     // justifyContent: 'center', // Center the profile image and details vertically
//     alignItems: 'center', // Center the profile image and details horizontally
//   },
//   profileImage: {
//     width: 170,
//     height: 170,
//     borderRadius: 85, // Circular frame
//     marginBottom: 20,
//   },
//   detailsContainer: {
//     alignItems: 'center',
//   },
//   connections: {
//     fontStyle: 'normal',
//     color: '#555',
//     marginBottom: 5, // Space between connections and city
//   },
//   interests: {
//     fontStyle: 'normal',
//     color: '#555',
//     marginBottom: 5, // Space between connections and city
//     // textAlign:'left',
//   },
//   city: {
//     fontStyle: 'bold',
//     color: '#555',
//     flexWrap: 'wrap', // Allow text to wrap
//     textAlign: 'center', // Center the text horizontally
//     marginBottom: 5, // Space between connections and city
//   },
//   label: {
//     fontStyle: 'normal',
//     color: '#777',
//   },
// });

// import React from 'react';
// import { StyleSheet, View, Image } from 'react-native';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Collapsible } from '@/components/Collapsible';

// export default function ProfileScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <View style={styles.header}>
//         <ThemedText type="title" style={styles.profileLabel}>
//           Profile
//         </ThemedText>
//         <ThemedText type="title" style={styles.name}>
//           John Doe
//         </ThemedText>
//       </View>
//       <View style={styles.profileSection}>
//         <Image
//           source={{ uri: 'https://via.placeholder.com/170' }} // Placeholder image URL
//           style={styles.profileImage}
//         />
//         <View style={styles.detailsContainer}>
//           <ThemedText type="body" style={styles.city}>
//             New York City
//           </ThemedText>
//           <ThemedText type="body" style={styles.connections}>
//             150 <ThemedText type="body" style={styles.label}>connections</ThemedText>
//           </ThemedText>
//         </View>
//       </View>
//       <View style={styles.collapsibleContainer}>
//         <Collapsible title="Interests">
//           <View style={styles.detailsContainer}>
//             <ThemedText type="body" style={styles.interests}>
//               - Basketball
//             </ThemedText>
//             <ThemedText type="body" style={styles.interests}>
//               - Running
//             </ThemedText>
//           </View>
//         </Collapsible>
//         <Collapsible title="Languages Spoken">
//           <View style={styles.detailsContainer}>
//             <ThemedText type="body" style={styles.interests}>
//               - English
//             </ThemedText>
//             <ThemedText type="body" style={styles.interests}>
//               - Italian
//             </ThemedText>
//           </View>
//         </Collapsible>
//       </View>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 20, // Adjust the padding to position content from the top
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingTop: 30,
//     alignItems: 'flex-start', // Align header content to the left
//   },
//   profileLabel: {
//     fontStyle: 'normal',
//     color: '#999',
//   },
//   name: {
//     fontStyle: 'normal',
//     marginTop: 5, // Space between "Profile" and name
//   },
//   profileSection: {
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   profileImage: {
//     width: 170,
//     height: 170,
//     borderRadius: 85, // Circular frame
//     marginBottom: 20,
//   },
//   detailsContainer: {
//     alignItems: 'center',
//   },
//   connections: {
//     fontStyle: 'normal',
//     color: '#555',
//     marginBottom: 5, // Space between connections and city
//   },
//   interests: {
//     fontStyle: 'normal',
//     color: '#555',
//     marginBottom: 5, // Space between interests
//   },
//   city: {
//     fontStyle: 'bold',
//     color: '#555',
//     textAlign: 'center', // Center the text horizontally
//     marginBottom: 5, // Space between connections and city
//   },
//   label: {
//     fontStyle: 'normal',
//     color: '#777',
//   },
//   collapsibleContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
// });
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.profileLabel}>
          Profile
        </ThemedText>
        <ThemedText type="title" style={styles.name}>
          John Doe
        </ThemedText>
      </View>
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/170' }} // Placeholder image URL
          style={styles.profileImage}
        />
        <View style={styles.centeredDetailsContainer}>
          <ThemedText type="body" style={styles.city}>
            New York City placeholderText
          </ThemedText>
          <ThemedText type="body" style={styles.connections}>
            150 <ThemedText type="body" style={styles.label}>connections</ThemedText>
          </ThemedText>
        </View>
      </View>
      <View style={styles.collapsibleContainer}>
        <Collapsible title="Interests" titleStyle={styles.collapsibleTitle}>
          <View style={styles.leftAlignedDetailsContainer}>
            <ThemedText type="body" style={styles.interests}>
              - Basketball
            </ThemedText>
            <ThemedText type="body" style={styles.interests}>
              - Running
            </ThemedText>
          </View>
        </Collapsible>
        <Collapsible title="Languages Spoken" titleStyle={styles.collapsibleTitle}>
          <View style={styles.leftAlignedDetailsContainer}>
            <ThemedText type="body" style={styles.interests}>
              - English
            </ThemedText>
            <ThemedText type="body" style={styles.interests}>
              - Italian
            </ThemedText>
          </View>
        </Collapsible>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adjust the padding to position content from the top
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: 'flex-start', // Align header content to the left
  },
  profileLabel: {
    fontStyle: 'normal',
    color: '#999',
  },
  name: {
    fontStyle: 'normal',
    marginTop: 5, // Space between "Profile" and name
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 85, // Circular frame
    marginBottom: 20,
  },
  centeredDetailsContainer: {
    alignItems: 'center', // Center text horizontally
    width: '100%',
    paddingHorizontal: 20,
  },
  leftAlignedDetailsContainer: {
    alignItems: 'flex-start', // Align text to the left
    width: '100%',
    paddingHorizontal: 20,
  },
  connections: {
    fontStyle: 'normal',
    color: '#555',
    marginBottom: 5, // Space between connections and city
  },
  interests: {
    fontStyle: 'normal',
    color: '#555',
    marginBottom: 5, // Space between interests
    textAlign: 'left', // Align text to the left
  },
  city: {
    fontStyle: 'bold',
    color: '#555',
    textAlign: 'center', // Center the text horizontally
    marginBottom: 5, // Space between connections and city
  },
  label: {
    fontStyle: 'normal',
    color: '#777',
  },
  collapsibleContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  collapsibleTitle: {
    fontSize: 18, // Increase the font size of the collapsible title
    fontWeight: 'bold',
    color: '#333',
  },
});



// import Ionicons from '@expo/vector-icons/Ionicons';
// import { StyleSheet, Image, Platform } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function TabTwoScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
//       headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Explore</ThemedText>
//       </ThemedView>
//       <ThemedText>This app includes example code to help you get started.</ThemedText>
//       <Collapsible title="File-based routing">
//         <ThemedText>
//           This app has two screens:{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
//         </ThemedText>
//         <ThemedText>
//           The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
//           sets up the tab navigator.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/router/introduction">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Android, iOS, and web support">
//         <ThemedText>
//           You can open this project on Android, iOS, and the web. To open the web version, press{' '}
//           <ThemedText type="defaultSemiBold">w</ThemedText> in the terminal running this project.
//         </ThemedText>
//       </Collapsible>
//       <Collapsible title="Images">
//         <ThemedText>
//           For static images, you can use the <ThemedText type="defaultSemiBold">@2x</ThemedText> and{' '}
//           <ThemedText type="defaultSemiBold">@3x</ThemedText> suffixes to provide files for
//           different screen densities
//         </ThemedText>
//         <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
//         <ExternalLink href="https://reactnative.dev/docs/images">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Custom fonts">
//         <ThemedText>
//           Open <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText> to see how to load{' '}
//           <ThemedText style={{ fontFamily: 'SpaceMono' }}>
//             custom fonts such as this one.
//           </ThemedText>
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Light and dark mode components">
//         <ThemedText>
//           This template has light and dark mode support. The{' '}
//           <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> hook lets you inspect
//           what the user's current color scheme is, and so you can adjust UI colors accordingly.
//         </ThemedText>
//         <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//           <ThemedText type="link">Learn more</ThemedText>
//         </ExternalLink>
//       </Collapsible>
//       <Collapsible title="Animations">
//         <ThemedText>
//           This template includes an example of an animated component. The{' '}
//           <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
//           the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText> library
//           to create a waving hand animation.
//         </ThemedText>
//         {Platform.select({
//           ios: (
//             <ThemedText>
//               The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
//               component provides a parallax effect for the header image.
//             </ThemedText>
//           ),
//         })}
//       </Collapsible>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     color: '#808080',
//     bottom: -90,
//     left: -35,
//     position: 'absolute',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     gap: 8,
//   },
// });
