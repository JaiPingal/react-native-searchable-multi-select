package com.searchablemultiselect;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;

public class SearchableMultiSelectModule extends SearchableMultiSelectSpec {
  public static final String NAME = "SearchableMultiSelect";

  SearchableMultiSelectModule(ReactApplicationContext context) {
    super(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("react-native-searchable-multi-select");
  }

  public static native double nativeMultiply(double a, double b);

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  public void multiply(double a, double b, Promise promise) {
    promise.resolve(nativeMultiply(a, b));
  }
}
