#ifdef __cplusplus
#import "react-native-searchable-multi-select.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNSearchableMultiSelectSpec.h"

@interface SearchableMultiSelect : NSObject <NativeSearchableMultiSelectSpec>
#else
#import <React/RCTBridgeModule.h>

@interface SearchableMultiSelect : NSObject <RCTBridgeModule>
#endif

@end
