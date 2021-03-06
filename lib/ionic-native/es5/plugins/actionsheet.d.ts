export interface ActionSheetOptions {
    /**
     * The labels for the buttons. Uses the index x
     */
    buttonLabels: string[];
    /**
     * The title for the actionsheet
     */
    title?: string;
    /**
     * Theme to be used on Android
     */
    androidTheme?: number;
    /**
     * Enable a cancel on Android
     */
    androidEnableCancelButton?: boolean;
    /**
     * Enable a cancel on Windows Phone
     */
    winphoneEnableCancelButton?: boolean;
    /**
     * Add a cancel button with text
     */
    addCancelButtonWithLabel?: string;
    /**
     * Add a destructive button with text
     */
    addDestructiveButtonWithLabel?: string;
    /**
     * On an iPad, set the X,Y position
     */
    position?: number[];
}
/**
 * @name Action Sheet
 * @description
 * The ActionSheet plugin shows a native list of options the user can choose from.
 *
 * Requires Cordova plugin: `cordova-plugin-actionsheet`. For more info, please see the [ActionSheet plugin docs](https://github.com/EddyVerbruggen/cordova-plugin-actionsheet).
 *
 * @usage
 * ```typescript
 * import { ActionSheet } from 'ionic-native';
 *
 * let buttonLabels = ['Share via Facebook', 'Share via Twitter'];
 * ActionSheet.show({
 *   'title': 'What do you want with this image?',
 *   'buttonLabels': buttonLabels,
 *   'addCancelButtonWithLabel': 'Cancel',
 *   'addDestructiveButtonWithLabel' : 'Delete'
 * }).then((buttonIndex: number) => {
 *   console.log('Button pressed: ' + buttonIndex);
 * });
 * ```
 * @interfaces
 * ActionSheetOptions
 */
export declare class ActionSheet {
    /**
     * Show a native ActionSheet component. See below for options.
     * @param options {ActionSheetOptions} Options See table below
     * @returns {Promise<any>} Returns a Promise that resolves with the index of the
     *   button pressed (1 based, so 1, 2, 3, etc.)
     */
    static show(options?: ActionSheetOptions): Promise<any>;
    /**
     * Progamtically hide the native ActionSheet
     * @returns {Promise<any>} Returns a Promise that resolves when the actionsheet is closed
     */
    static hide(options?: any): Promise<any>;
}
