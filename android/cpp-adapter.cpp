#include <jni.h>
#include "react-native-searchable-multi-select.h"

extern "C"
JNIEXPORT jdouble JNICALL
Java_com_searchablemultiselect_SearchableMultiSelectModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return searchablemultiselect::multiply(a, b);
}
