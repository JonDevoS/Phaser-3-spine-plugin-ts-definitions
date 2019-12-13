/// <reference path="../node_modules/phaser/types/phaser.d.ts" />
/// <reference path="../node_modules/phaser/types/spine.d.ts" />

declare namespace SpinePluginEvents {
    /**
     * The Complete Event.
     */
    const COMPLETE: any;

    /**
     * The Dispose Event.
     */
    const DISPOSE: any;

    /**
     * The End Event.
     */
    const END: any;

    /**
     * The Custom Event Event.
     */
    const EVENT: any;

    /**
     * The Interrupted Event.
     */
    const INTERRUPTED: any;

    /**
     * The Start Event.
     */
    const START: any;

}

/**
 * A Spine Game Object is a Phaser level object that can be added to your Phaser Scenes. It encapsulates
 * a Spine Skeleton with Spine Animation Data and Animation State, with helper methods to allow you to
 * easily change the skin, slot attachment, bone positions and more.
 * 
 * Spine Game Objects can be created via the Game Object Factory, Game Object Creator, or directly.
 * You can only create them if the Spine plugin has been loaded into Phaser.
 * 
 * The quickest way is the Game Object Factory:
 * 
 * ```javascript
 * let jelly = this.add.spine(512, 550, 'jelly', 'jelly-think', true);
 * ```
 * 
 * Here we are creating a new Spine Game Object positioned at 512 x 550. It's using the `jelly`
 * Spine data, which has previously been loaded into your Scene. The `jelly-think` argument is
 * an optional animation to start playing on the skeleton. The final argument `true` sets the
 * animation to loop. Look at the documentation for further details on each of these options.
 * 
 * For more control, you can use the Game Object Creator, passing in a Spine Game Object
 * Configuration object:
 * 
 * ```javascript
 * let jelly = this.make.spine({
 *     x: 512, y: 550, key: 'jelly',
 *     scale: 1.5,
 *     skinName: 'square_Green',
 *     animationName: 'jelly-think', loop: true,
 *     slotName: 'hat', attachmentName: 'images/La_14'
 * });
 * ```
 * 
 * Here, you've got the ability to specify extra details, such as the slot name, attachments or
 * overall scale.
 * 
 * If you wish to instantiate a Spine Game Object directly you can do so, but in order for it to
 * update and render, it must be added to the display and update lists of your Scene:
 * 
 * ```javascript
 * let jelly = new SpineGameObject(this, this.spine, 512, 550, 'jelly', 'jelly-think', true);
 * this.sys.displayList.add(jelly);
 * this.sys.updateList.add(jelly);
 * ```
 * 
 * It's possible to enable Spine Game Objects for input, but you should be aware that it will use
 * the bounds of the skeletons current pose to create the hit area from. Sometimes this is ok, but
 * often not. Make use of the `InputPlugin.enableDebug` method to view the input shape being created.
 * If it's not suitable, provide your own shape to the `setInteractive` method.
 * 
 * Due to the way Spine handles scaling, it's not recommended to enable a Spine Game Object for
 * physics directly. Instead, you should look at creating a proxy body and syncing the Spine Game
 * Object position with it. See the examples for further details.
 * 
 * If your Spine Game Object has black outlines around the different parts of the texture when it
 * renders then you have exported the files from Spine with pre-multiplied alpha enabled, but have
 * forgotten to set that flag when loading the Spine data. Please see the loader docs for more details.
 */
declare class SpineGameObject extends Phaser.GameObjects.GameObject {
    /**
     * 
     * @param scene A reference to the Scene that this Game Object belongs to.
     * @param pluginManager A reference to the Phaser Spine Plugin.
     * @param x The horizontal position of this Game Object in the world.
     * @param y The vertical position of this Game Object in the world.
     * @param key The key of the Spine Skeleton this Game Object will use, as stored in the Spine Plugin.
     * @param animationName The name of the animation to set on this Skeleton.
     * @param loop Should the animation playback be looped or not? Default false.
     */
    constructor(scene: Phaser.Scene, pluginManager: SpinePlugin, x: number, y: number, key?: string, animationName?: string, loop?: boolean);
    /**
     * This is a special setter that allows you to set both the horizontal and vertical scale of this Game Object
     * to the same value, at the same time. When reading this value the result returned is `(scaleX + scaleY) / 2`.
     * 
     * Use of this property implies you wish the horizontal and vertical scales to be equal to each other. If this
     * isn't the case, use the `scaleX` or `scaleY` properties instead.
     */
    scale: number;
    /**
     * The angle of this Game Object as expressed in degrees.
     * 
     * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left
     * and -90 is up.
     * 
     * If you prefer to work in radians, see the `rotation` property instead.
     */
    angle: integer;

    /**
     * The angle of this Game Object in radians.
     * 
     * Phaser uses a right-hand clockwise rotation system, where 0 is right, 90 is down, 180/-180 is left
     * and -90 is up.
     * 
     * If you prefer to work in degrees, see the `angle` property instead.
     */
    rotation: number;
    /**
     * The visible state of the Game Object.
     * 
     * An invisible Game Object will skip rendering, but will still process update logic.
     */
    visible: boolean;
    /**
     * The x position of this Game Object.
     */
    x: number;

    /**
     * The y position of this Game Object.
     */
    y: number;
    /**
     * A reference to the Spine Plugin.
     */
    plugin: SpinePlugin;

    /**
     * The Spine Skeleton this Game Object is using.
     */
    skeleton: spine.Skeleton;

    /**
     * The Spine Skeleton Data associated with the Skeleton this Game Object is using.
     */
    skeletonData: spine.SkeletonData;

    /**
     * The Spine Animation State this Game Object is using.
     */
    // state: spine.AnimationState;

    /**
     * The Spine Animation State Data associated with the Animation State this Game Object is using.
     */
    stateData: spine.AnimationStateData;

    /**
     * A reference to the root bone of the Skeleton.
     */
    root: spine.Bone;

    /**
     * This object holds the calculated bounds of the current
     * pose, as set when a new Skeleton is applied.
     */
    bounds: any;

    /**
     * A Game Object level flag that allows you to enable debug drawing
     * to the Skeleton Debug Renderer by toggling it.
     */
    drawDebug: boolean;

    /**
     * The factor to scale the Animation update time by.
     */
    timeScale: number;

    /**
     * The calculated Display Origin of this Game Object.
     */
    displayOriginX: number;

    /**
     * The calculated Display Origin of this Game Object.
     */
    displayOriginY: number;

    /**
     * A flag that stores if the texture associated with the current
     * Skin being used by this Game Object, has its alpha pre-multiplied
     * into it, or not.
     */
    preMultipliedAlpha: boolean;

    /**
     * A default Blend Mode. You cannot change the blend mode of a
     * Spine Game Object.
     */
    readonly blendMode: number;

    /**
     * Overrides the default Game Object method and always returns true.
     * Rendering is decided in the renderer functions.
     */
    willRender(): boolean;

    /**
     * Set the Alpha level for the whole Skeleton of this Game Object.
     * 
     * The alpha controls the opacity of the Game Object as it renders.
     * 
     * Alpha values are provided as a float between 0, fully transparent, and 1, fully opaque.
     * @param value The alpha value used for the whole Skeleton. Default 1.
     */
    setAlpha(value?: number): this;

    /**
     * The alpha value of the Skeleton.
     * 
     * A value between 0 and 1.
     * 
     * This is a global value, impacting the entire Skeleton, not just a region of it.
     */
    alpha: number;

    /**
     * The amount of red used when rendering the Skeleton.
     * 
     * A value between 0 and 1.
     * 
     * This is a global value, impacting the entire Skeleton, not just a region of it.
     */
    red: number;

    /**
     * The amount of green used when rendering the Skeleton.
     * 
     * A value between 0 and 1.
     * 
     * This is a global value, impacting the entire Skeleton, not just a region of it.
     */
    green: number;

    /**
     * The amount of blue used when rendering the Skeleton.
     * 
     * A value between 0 and 1.
     * 
     * This is a global value, impacting the entire Skeleton, not just a region of it.
     */
    blue: number;

    /**
     * Sets the color on the given attachment slot. Or, if no slot is given, on the whole skeleton.
     * @param color The color being applied to the Skeleton or named Slot. Set to white to disable any previously set color. Default 0xffffff.
     * @param slotName The name of the slot to set the color on. If not give, will be set on the whole skeleton.
     */
    setColor(color?: integer, slotName?: string): this;

    /**
     * Sets this Game Object to use the given Skeleton based on the Atlas Data Key and a provided JSON object
     * that contains the Skeleton data.
     * @param atlasDataKey The key of the Spine data to use for this Skeleton.
     * @param skeletonJSON The JSON data for the Skeleton.
     * @param animationName Optional name of the animation to set on the Skeleton.
     * @param loop Should the animation, if set, loop or not? Default false.
     */
    setSkeletonFromJSON(atlasDataKey: string, skeletonJSON: object, animationName?: string, loop?: boolean): this;

    /**
     * Sets this Game Object to use the given Skeleton based on its cache key.
     * 
     * Typically, once set, the Skeleton doesn't change. Instead, you change the skin,
     * or slot attachment, or any other property to adjust it.
     * @param atlasDataKey The key of the Spine data to use for this Skeleton.
     * @param skeletonJSON The JSON data for the Skeleton.
     * @param animationName Optional name of the animation to set on the Skeleton.
     * @param loop Should the animation, if set, loop or not? Default false.
     */
    setSkeleton(atlasDataKey: string, skeletonJSON: object, animationName?: string, loop?: boolean): this;

    /**
     * Refreshes the data about the current Skeleton.
     * 
     * This will reset the rotation, position and size of the Skeleton to match this Game Object.
     * 
     * Call this method if you need to access the Skeleton data directly, and it may have changed
     * recently.
     */
    refresh(): this;

    /**
     * Sets the size of this Game Object.
     * 
     * If no arguments are given it uses the current skeleton data dimensions.
     * 
     * You can use this method to set a fixed size of this Game Object, such as for input detection,
     * when the skeleton data doesn't match what is required in-game.
     * @param width The width of the Skeleton. If not given it defaults to the Skeleton Data width.
     * @param height The height of the Skeleton. If not given it defaults to the Skeleton Data height.
     * @param offsetX The horizontal offset of the Skeleton from its x and y coordinate. Default 0.
     * @param offsetY The vertical offset of the Skeleton from its x and y coordinate. Default 0.
     */
    setSize(width?: number, height?: number, offsetX?: number, offsetY?: number): this;

    /**
     * Sets the offset of this Game Object from the Skeleton position.
     * 
     * You can use this method to adjust how the position of this Game Object relates to the Skeleton it is using.
     * @param offsetX The horizontal offset of the Skeleton from its x and y coordinate. Default 0.
     * @param offsetY The vertical offset of the Skeleton from its x and y coordinate. Default 0.
     */
    setOffset(offsetX?: number, offsetY?: number): this;

    /**
     * Internal method that syncs all of the Game Object position and scale data to the Skeleton.
     * It then syncs the skeleton bounds back to this Game Object.
     * 
     * This method is called automatically as needed internally, however, it's also exposed should
     * you require overriding the size settings.
     */
    updateSize(): this;

    /**
     * The horizontal scale of this Game Object, as applied to the Skeleton it is using.
     */
    scaleX: number;

    /**
     * The vertical scale of this Game Object, as applied to the Skeleton it is using.
     */
    scaleY: number;

    /**
     * Returns an array containing the names of all the bones in the Skeleton Data.
     */
    getBoneList(): string[];

    /**
     * Returns an array containing the names of all the skins in the Skeleton Data.
     */
    getSkinList(): string[];

    /**
     * Returns an array containing the names of all the slots in the Skeleton.
     */
    getSlotList(): string[];

    /**
     * Returns an array containing the names of all the animations in the Skeleton Data.
     */
    getAnimationList(): string[];

    /**
     * Returns the current animation being played on the given track, if any.
     * @param trackIndex The track to return the current animation on. Default 0.
     */
    getCurrentAnimation(trackIndex?: integer): spine.Animation;

    /**
     * Sets the current animation for a track, discarding any queued animations.
     * If the formerly current track entry was never applied to a skeleton, it is replaced (not mixed from).
     * 
     * Animations are referenced by a unique string-based key, as defined in the Spine software.
     * @param animationName The string-based key of the animation to play.
     * @param loop Should the animation be looped when played? Default false.
     * @param ignoreIfPlaying If this animation is already playing then ignore this call. Default false.
     */
    play(animationName: string, loop?: boolean, ignoreIfPlaying?: boolean): this;

    /**
     * Sets the current animation for a track, discarding any queued animations.
     * If the formerly current track entry was never applied to a skeleton, it is replaced (not mixed from).
     * 
     * Animations are referenced by a unique string-based key, as defined in the Spine software.
     * @param trackIndex The track index to play the animation on.
     * @param animationName The string-based key of the animation to play.
     * @param loop Should the animation be looped when played? Default false.
     * @param ignoreIfPlaying If this animation is already playing then ignore this call. Default false.
     */
    setAnimation(trackIndex: integer, animationName: string, loop?: boolean, ignoreIfPlaying?: boolean): spine.TrackEntry;

    /**
     * Adds an animation to be played after the current or last queued animation for a track.
     * If the track is empty, it is equivalent to calling setAnimation.
     * 
     * Animations are referenced by a unique string-based key, as defined in the Spine software.
     * 
     * The delay is a float. If > 0, sets delay. If <= 0, the delay set is the duration of the previous
     * track entry minus any mix duration (from the AnimationStateData) plus the specified delay
     * (ie the mix ends at (delay = 0) or before (delay < 0) the previous track entry duration).
     * If the previous entry is looping, its next loop completion is used instead of its duration.
     * @param trackIndex The track index to add the animation to.
     * @param animationName The string-based key of the animation to add.
     * @param loop Should the animation be looped when played? Default false.
     * @param delay A delay, in ms, before which this animation will start when played. Default 0.
     */
    addAnimation(trackIndex: integer, animationName: string, loop?: boolean, delay?: integer): spine.TrackEntry;

    /**
     * Sets an empty animation for a track, discarding any queued animations, and sets the track
     * entry's mixDuration. An empty animation has no timelines and serves as a placeholder for mixing in or out.
     * 
     * Mixing out is done by setting an empty animation with a mix duration using either setEmptyAnimation,
     * setEmptyAnimations, or addEmptyAnimation. Mixing to an empty animation causes the previous animation to be
     * applied less and less over the mix duration. Properties keyed in the previous animation transition to
     * the value from lower tracks or to the setup pose value if no lower tracks key the property.
     * A mix duration of 0 still mixes out over one frame.
     * 
     * Mixing in is done by first setting an empty animation, then adding an animation using addAnimation
     * and on the returned track entry, set the mixDuration. Mixing from an empty animation causes the new
     * animation to be applied more and more over the mix duration. Properties keyed in the new animation
     * transition from the value from lower tracks or from the setup pose value if no lower tracks key the
     * property to the value keyed in the new animation.
     * @param trackIndex The track index to add the animation to.
     * @param mixDuration Seconds for mixing from the previous animation to this animation. Defaults to the value provided by AnimationStateData getMix based on the animation before this animation (if any).
     */
    setEmptyAnimation(trackIndex: integer, mixDuration?: integer): spine.TrackEntry;

    /**
     * Removes all animations from the track, leaving skeletons in their current pose.
     * 
     * It may be desired to use setEmptyAnimation to mix the skeletons back to the setup pose,
     * rather than leaving them in their current pose.
     * @param trackIndex The track index to add the animation to.
     */
    clearTrack(trackIndex: integer): this;

    /**
     * Removes all animations from all tracks, leaving skeletons in their current pose.
     * 
     * It may be desired to use setEmptyAnimation to mix the skeletons back to the setup pose,
     * rather than leaving them in their current pose.
     */
    clearTracks(): this;

    /**
     * Sets the skin used to look up attachments before looking in the defaultSkin.
     * 
     * Attachments from the new skin are attached if the corresponding attachment from the
     * old skin was attached. If there was no old skin, each slot's setup mode attachment is
     * attached from the new skin.
     * 
     * After changing the skin, the visible attachments can be reset to those attached in the
     * setup pose by calling setSlotsToSetupPose. Also, often apply is called before the next time
     * the skeleton is rendered to allow any attachment keys in the current animation(s) to hide
     * or show attachments from the new skin.
     * @param skinName The name of the skin to set.
     */
    setSkinByName(skinName: string): this;

    /**
     * Sets the skin used to look up attachments before looking in the defaultSkin.
     * 
     * Attachments from the new skin are attached if the corresponding attachment from the
     * old skin was attached. If there was no old skin, each slot's setup mode attachment is
     * attached from the new skin.
     * 
     * After changing the skin, the visible attachments can be reset to those attached in the
     * setup pose by calling setSlotsToSetupPose. Also, often apply is called before the next time
     * the skeleton is rendered to allow any attachment keys in the current animation(s) to hide
     * or show attachments from the new skin.
     * @param newSkin The Skin to set. May be `null`.
     */
    setSkin(newSkin: spine.Skin): this;

    /**
     * Sets the mix duration when changing from the specified animation to the other.
     * @param fromName The animation to mix from.
     * @param toName The animation to mix to.
     * @param duration Seconds for mixing from the previous animation to this animation. Defaults to the value provided by AnimationStateData getMix based on the animation before this animation (if any).
     */
    setMix(fromName: string, toName: string, duration?: number): this;

    /**
     * Finds an attachment by looking in the skin and defaultSkin using the slot
     * index and attachment name. First the skin is checked and if the attachment was not found,
     * the default skin is checked.
     * @param slotIndex The slot index to search.
     * @param attachmentName The attachment name to look for.
     */
    getAttachment(slotIndex: integer, attachmentName: string): spine.Attachment;

    /**
     * Finds an attachment by looking in the skin and defaultSkin using the slot name and attachment name.
     * @param slotName The slot name to search.
     * @param attachmentName The attachment name to look for.
     */
    getAttachmentByName(slotName: string, attachmentName: string): spine.Attachment;

    /**
     * A convenience method to set an attachment by finding the slot with findSlot,
     * finding the attachment with getAttachment, then setting the slot's attachment.
     * @param slotName The slot name to add the attachment to.
     * @param attachmentName The attachment name to add.
     */
    setAttachment(slotName: string, attachmentName: string): this;

    /**
     * Sets the bones, constraints, slots, and draw order to their setup pose values.
     */
    setToSetupPose(): this;

    /**
     * Sets the slots and draw order to their setup pose values.
     */
    setSlotsToSetupPose(): this;

    /**
     * Sets the bones and constraints to their setup pose values.
     */
    setBonesToSetupPose(): this;

    /**
     * Gets the root bone, or null.
     */
    getRootBone(): spine.Bone;

    /**
     * Takes a Bone object and a position in world space and rotates the Bone so it is angled
     * towards the given position. You can set an optional angle offset, should the bone be
     * designed at a specific angle already. You can also set a minimum and maximum range for the angle.
     * @param bone The bone to rotate towards the world position.
     * @param worldX The world x coordinate to rotate the bone towards.
     * @param worldY The world y coordinate to rotate the bone towards.
     * @param offset An offset to add to the rotation angle. Default 0.
     * @param minAngle The minimum range of the rotation angle. Default 0.
     * @param maxAngle The maximum range of the rotation angle. Default 360.
     */
    angleBoneToXY(bone: spine.Bone, worldX: number, worldY: number, offset?: number, minAngle?: number, maxAngle?: number): this;

    /**
     * Finds a bone by comparing each bone's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param boneName The name of the bone to find.
     */
    findBone(boneName: string): spine.Bone;

    /**
     * Finds the index of a bone by comparing each bone's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param boneName The name of the bone to find.
     */
    findBoneIndex(boneName: string): integer;

    /**
     * Finds a slot by comparing each slot's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param slotName The name of the slot to find.
     */
    findSlot(slotName: string): spine.Slot;

    /**
     * Finds the index of a slot by comparing each slot's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param slotName The name of the slot to find.
     */
    findSlotIndex(slotName: string): integer;

    /**
     * Finds a skin by comparing each skin's name. It is more efficient to cache the results of
     * this method than to call it multiple times.
     * @param skinName The name of the skin to find.
     */
    findSkin(skinName: string): spine.Skin;

    /**
     * Finds an event by comparing each events's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param eventDataName The name of the event to find.
     */
    findEvent(eventDataName: string): spine.EventData;

    /**
     * Finds an animation by comparing each animation's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param animationName The name of the animation to find.
     */
    findAnimation(animationName: string): spine.Animation;

    /**
     * Finds an IK constraint by comparing each IK constraint's name. It is more efficient to cache the results
     * of this method than to call it multiple times.
     * @param constraintName The name of the constraint to find.
     */
    findIkConstraint(constraintName: string): spine.IkConstraintData;

    /**
     * Finds an transform constraint by comparing each transform constraint's name.
     * It is more efficient to cache the results of this method than to call it multiple times.
     * @param constraintName The name of the constraint to find.
     */
    findTransformConstraint(constraintName: string): spine.TransformConstraintData;

    /**
     * Finds a path constraint by comparing each path constraint's name.
     * It is more efficient to cache the results of this method than to call it multiple times.
     * @param constraintName The name of the constraint to find.
     */
    findPathConstraint(constraintName: string): spine.PathConstraintData;

    /**
     * Finds the index of a path constraint by comparing each path constraint's name.
     * It is more efficient to cache the results of this method than to call it multiple times.
     * @param constraintName The name of the constraint to find.
     */
    findPathConstraintIndex(constraintName: string): integer;

    /**
     * Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose.
     * 
     * The returned object contains two properties: `offset` and `size`:
     * 
     * `offset` - The distance from the skeleton origin to the bottom left corner of the AABB.
     * `size` - The width and height of the AABB.
     */
    getBounds(): any;

    /**
     * Internal update handler.
     * @param time The current timestamp.
     * @param delta The delta time, in ms, elapsed since the last frame.
     */
    protected preUpdate(time: number, delta: number): void;

    /**
     * Internal destroy handler, called as part of the destroy process.
     */
    protected preDestroy(): void;

}

/**
 * The Spine Plugin is a Scene based plugin that handles the creation and rendering of Spine Game Objects.
 * 
 * All rendering and object creation is handled via the official Spine Runtimes. This version of the plugin
 * uses the Spine 3.8.72 runtimes. Please note that due to the way the Spine runtimes use semver, you will
 * get breaking changes in point-releases. Therefore, files created in a different version of Spine may not
 * work as a result, without you first updating the runtimes and rebuilding the plugin.
 * 
 * You can find more details about Spine at http://esotericsoftware.com/.
 * 
 * Please note that you require a Spine license in order to use Spine Runtimes in your games.
 * 
 * You can install this plugin into your Phaser game by either importing it, if you're using ES6:
 * 
 * ```javascript
 * import * as SpinePlugin from './SpinePlugin.js';
 * ```
 * 
 * and then adding it to your Phaser Game configuration:
 * 
 * ```javascript
 * plugins: {
 *     scene: [
 *         { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
 *     ]
 * }
 * ```
 * 
 * If you're using ES5 then you can load the Spine Plugin in a Scene files payload, _within_ your
 * Game Configuration object, like this:
 * 
 * ```javascript
 * scene: {
 *     preload: preload,
 *     create: create,
 *     pack: {
 *         files: [
 *             { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/SpinePlugin.js', sceneKey: 'spine' }
 *         ]
 *     }
 * }
 * ```
 * 
 * Loading it like this allows you to then use commands such as `this.load.spine` from within the
 * same Scene. Alternatively, you can use the method `this.load.plugin` to load the plugin via the normal
 * Phaser Loader. However, doing so will not add it to the current Scene. It will be available from any
 * subsequent Scenes.
 * 
 * Assuming a default environment you access it from within a Scene by using the `this.spine` reference.
 * 
 * When this plugin is installed into a Scene it will add a Loader File Type, allowing you to load
 * Spine files directly, i.e.:
 * 
 * ```javascript
 * this.load.spine('stretchyman', 'stretchyman-pro.json', [ 'stretchyman-pma.atlas' ], true);
 * ```
 * 
 * It also installs a Game Object Factory method, allowing you to create Spine Game Objects:
 * 
 * ```javascript
 * this.add.spine(512, 650, 'stretchyman')
 * ```
 * 
 * The first argument is the key which you used when importing the Spine data. There are lots of
 * things you can specify, such as the animation name, skeleton, slot attachments and more. Please
 * see the respective documentation and examples for further details.
 * 
 * Phaser expects the Spine data to be exported from the Spine application in a JSON format, not binary.
 * The associated atlas files are scanned for any texture files present in them, which are then loaded.
 * If you have exported your Spine data with preMultipliedAlpha set, then you should enable this in the
 * load arguments, or you may see black outlines around skeleton textures.
 * 
 * The Spine plugin is local to the Scene in which it is installed. This means a change to something,
 * such as the Skeleton Debug Renderer, in this Scene, will not impact the renderer in any other Scene.
 * The only exception to this is with the caches this plugin creates. Spine atlas and texture data are
 * stored in their own caches, which are global, meaning they're accessible from any Scene in your
 * game, regardless if the Scene loaded the Spine data or not.
 * 
 * For details about the Spine Runtime API see http://esotericsoftware.com/spine-api-reference
 */
declare class SpinePlugin {
    /**
     * 
     * @param scene A reference to the Scene that has installed this plugin.
     * @param pluginManager A reference to the Phaser Plugin Manager.
     */
    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager);

    /**
     * A read-only flag that indicates if the game is running under WebGL or Canvas.
     */
    readonly isWebGL: boolean;

    /**
     * A custom cache that stores the Spine atlas data.
     * 
     * This cache is global across your game, allowing you to access Spine data loaded from other Scenes,
     * no matter which Scene you are in.
     */
    cache: Phaser.Cache.BaseCache;

    /**
     * A custom cache that stores the Spine Textures.
     * 
     * This cache is global across your game, allowing you to access Spine data loaded from other Scenes,
     * no matter which Scene you are in.
     */
    spineTextures: Phaser.Cache.BaseCache;

    /**
     * A reference to the global JSON Cache.
     */
    json: Phaser.Cache.BaseCache;

    /**
     * A reference to the global Texture Manager.
     */
    textures: Phaser.Textures.TextureManager;

    /**
     * A flag that sets if the Skeleton Renderers will render debug information over the top
     * of the skeleton or not.
     */
    drawDebug: boolean;

    /**
     * The underlying WebGL context of the Phaser renderer.
     * 
     * Only set if running in WebGL mode.
     */
    gl: WebGLRenderingContext;

    /**
     * A reference to either the Canvas or WebGL Renderer that this Game is using.
     */
    renderer: Phaser.Renderer.Canvas.CanvasRenderer | Phaser.Renderer.WebGL.WebGLRenderer;

    /**
     * An instance of the Spine WebGL Scene Renderer.
     * 
     * Only set if running in WebGL mode.
     */
    sceneRenderer: spine.webgl.SceneRenderer;

    /**
     * An instance of the Spine Skeleton Renderer.
     */
    skeletonRenderer: spine.canvas.SkeletonRenderer | spine.webgl.SkeletonRenderer;

    /**
     * An instance of the Spine Skeleton Debug Renderer.
     * 
     * Only set if running in WebGL mode.
     */
    skeletonDebugRenderer: spine.webgl.SkeletonDebugRenderer;

    /**
     * A reference to the Spine runtime.
     * This is the runtime created by Esoteric Software
     */
    // @ts-ignore
    plugin: spine;

    /**
     * Gets a loaded Spine Atlas from the cache and creates a new Spine Texture Atlas,
     * then returns it. You do not normally need to invoke this method directly.
     * @param key The key of the Spine Atlas to create.
     */
    getAtlasCanvas(key: string): spine.TextureAtlas;

    /**
     * Gets a loaded Spine Atlas from the cache and creates a new Spine Texture Atlas,
     * then returns it. You do not normally need to invoke this method directly.
     * @param key The key of the Spine Atlas to create.
     */
    getAtlasWebGL(key: string): spine.TextureAtlas;

    /**
     * Converts the given x and y screen coordinates into the world space of the given Skeleton.
     * 
     * Only works in WebGL.
     * @param x The screen space x coordinate to convert.
     * @param y The screen space y coordinate to convert.
     * @param skeleton The Spine Skeleton to convert into.
     * @param bone Optional bone of the Skeleton to convert into.
     */
    worldToLocal(x: number, y: number, skeleton: spine.Skeleton, bone?: spine.Bone): spine.Vector2;

    /**
     * Returns a Spine Vector2 based on the given x and y values.
     * @param x The Vector x value.
     * @param y The Vector y value.
     */
    getVector2(x: number, y: number): spine.Vector2;

    /**
     * Returns a Spine Vector2 based on the given x, y and z values.
     * 
     * Only works in WebGL.
     * @param x The Vector x value.
     * @param y The Vector y value.
     * @param z The Vector z value.
     */
    getVector3(x: number, y: number, z: number): spine.Vector2;

    /**
     * Sets `drawBones` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugBones(value?: boolean): this;

    /**
     * Sets `drawRegionAttachments` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugRegionAttachments(value?: boolean): this;

    /**
     * Sets `drawBoundingBoxes` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugBoundingBoxes(value?: boolean): this;

    /**
     * Sets `drawMeshHull` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugMeshHull(value?: boolean): this;

    /**
     * Sets `drawMeshTriangles` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugMeshTriangles(value?: boolean): this;

    /**
     * Sets `drawPaths` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugPaths(value?: boolean): this;

    /**
     * Sets `drawSkeletonXY` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugSkeletonXY(value?: boolean): this;

    /**
     * Sets `drawClipping` in the Spine Skeleton Debug Renderer.
     * 
     * Only works in WebGL.
     * @param value The value to set in the debug property. Default true.
     */
    setDebugClipping(value?: boolean): this;

    /**
     * Sets the given vertex effect on the Spine Skeleton Renderer.
     * 
     * Only works in WebGL.
     * @param effect The vertex effect to set on the Skeleton Renderer.
     */
    setEffect(effect?: spine.VertexEffect): this;

    /**
     * Creates a Spine Skeleton based on the given key and optional Skeleton JSON data.
     * 
     * The Skeleton data should have already been loaded before calling this method.
     * @param key The key of the Spine skeleton data, as loaded by the plugin. If the Spine JSON contains multiple skeletons, reference them with a period, i.e. `set.spineBoy`.
     * @param skeletonJSON Optional Skeleton JSON data to use, instead of getting it from the cache.
     */
    createSkeleton(key: string, skeletonJSON?: object): any | null;

    /**
     * Creates a new Animation State and Animation State Data for the given skeleton.
     * 
     * The returned object contains two properties: `state` and `stateData` respectively.
     * @param skeleton The Skeleton to create the Animation State for.
     */
    createAnimationState(skeleton: spine.Skeleton): any;

    /**
     * Returns the axis aligned bounding box (AABB) of the region and mesh attachments for the current pose.
     * 
     * The returned object contains two properties: `offset` and `size`:
     * 
     * `offset` - The distance from the skeleton origin to the bottom left corner of the AABB.
     * `size` - The width and height of the AABB.
     * @param skeleton The Skeleton to get the bounds from.
     */
    getBounds(skeleton: spine.Skeleton): any;

    /**
     * Internal handler for when the renderer resizes.
     * 
     * Only called if running in WebGL.
     */
    onResize(): void;

    /**
     * Creates a new Spine Game Object and adds it to the Scene.
     * 
     * The x and y coordinate given is used to set the placement of the root Spine bone, which can vary from
     * skeleton to skeleton. All rotation and scaling happens from the root bone placement. Spine Game Objects
     * do not have a Phaser origin.
     * 
     * If the Spine JSON file exported multiple Skeletons within it, then you can specify them by using a period
     * character in the key. For example, if you loaded a Spine JSON using the key `monsters` and it contains
     * multiple Skeletons, including one called `goblin` then you would use the key `monsters.goblin` to reference
     * that.
     * 
     * ```javascript
     * let jelly = this.add.spine(512, 550, 'jelly', 'jelly-think', true);
     * ```
     * 
     * The key is optional. If not passed here, you need to call `SpineGameObject.setSkeleton()` to use it.
     * 
     * The animation name is also optional and can be set later via `SpineGameObject.setAnimation`.
     * 
     * Should you wish for more control over the object creation, such as setting a slot attachment or skin
     * name, then use `SpinePlugin.make` instead.
     * @param x The horizontal position of this Game Object in the world.
     * @param y The vertical position of this Game Object in the world.
     * @param key The key of the Spine Skeleton this Game Object will use, as stored in the Spine Plugin.
     * @param animationName The name of the animation to set on this Skeleton.
     * @param loop Should the animation playback be looped or not? Default false.
     */
    add(x: number, y: number, key?: string, animationName?: string, loop?: boolean): SpineGameObject;

    /**
     * Creates a new Spine Game Object from the given configuration file and optionally adds it to the Scene.
     * 
     * The x and y coordinate given is used to set the placement of the root Spine bone, which can vary from
     * skeleton to skeleton. All rotation and scaling happens from the root bone placement. Spine Game Objects
     * do not have a Phaser origin.
     * 
     * If the Spine JSON file exported multiple Skeletons within it, then you can specify them by using a period
     * character in the key. For example, if you loaded a Spine JSON using the key `monsters` and it contains
     * multiple Skeletons, including one called `goblin` then you would use the key `monsters.goblin` to reference
     * that.
     * 
     * ```javascript
     * let jelly = this.make.spine({
     *     x: 500, y: 500, key: 'jelly',
     *     scale: 1.5,
     *     skinName: 'square_Green',
     *     animationName: 'jelly-idle', loop: true,
     *     slotName: 'hat', attachmentName: 'images/La_14'
     * });
     * ```
     * @param config The configuration object this Game Object will use to create itself.
     * @param addToScene Add this Game Object to the Scene after creating it? If set this argument overrides the `add` property in the config object.
     */
    make(config: any, addToScene?: boolean): SpineGameObject;

}

// declare module 'phaser' {
//     export = Phaser;
// }

declare namespace Phaser.Loader.FileTypes {
    type SpineFileConfig = {
        /**
         * The key of the file. Must be unique within both the Loader and the Texture Manager.
         */
        key: string;
        /**
         * The absolute or relative URL to load the texture image file from.
         */
        textureURL?: string;
        /**
         * The default file extension to use for the image texture if no url is provided.
         */
        textureExtension?: string;
        /**
         * Extra XHR Settings specifically for the texture image file.
         */
        textureXhrSettings?: Phaser.Types.Loader.XHRSettingsObject;
        /**
         * The filename of an associated normal map. It uses the same path and url to load as the texture image.
         */
        normalMap?: string;
        /**
         * The absolute or relative URL to load the atlas data file from.
         */
        atlasURL?: string;
        /**
         * The default file extension to use for the atlas data if no url is provided.
         */
        atlasExtension?: string;
        /**
         * Extra XHR Settings specifically for the atlas data file.
         */
        atlasXhrSettings?: Phaser.Types.Loader.XHRSettingsObject;
    };

    /**
     * A Spine File suitable for loading by the Loader.
     * 
     * These are created when you use the Phaser.Loader.LoaderPlugin#spine method and are not typically created directly.
     * 
     * For documentation about what all the arguments and configuration options mean please see Phaser.Loader.LoaderPlugin#spine.
     */
    class SpineFile {
        /**
         * 
         * @param loader A reference to the Loader that is responsible for this file.
         * @param key The key to use for this file, or a file configuration object.
         * @param jsonURL The absolute or relative URL to load the JSON file from. If undefined or `null` it will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
         * @param atlasURL The absolute or relative URL to load the texture atlas data file from. If undefined or `null` it will be set to `<key>.txt`, i.e. if `key` was "alien" then the URL will be "alien.txt".
         * @param preMultipliedAlpha Do the textures contain pre-multiplied alpha or not? Default false.
         * @param jsonXhrSettings An XHR Settings configuration object for the json file. Used in replacement of the Loaders default XHR Settings.
         * @param atlasXhrSettings An XHR Settings configuration object for the atlas data file. Used in replacement of the Loaders default XHR Settings.
         */
        constructor(loader: Phaser.Loader.LoaderPlugin, key: string | Phaser.Loader.FileTypes.SpineFileConfig, jsonURL?: string | string[], atlasURL?: string, preMultipliedAlpha?: boolean, jsonXhrSettings?: Phaser.Types.Loader.XHRSettingsObject, atlasXhrSettings?: Phaser.Types.Loader.XHRSettingsObject);

        /**
         * Called by each File when it finishes loading.
         * @param file The File that has completed processing.
         */
        onFileComplete(file: Phaser.Loader.File): void;

        /**
         * Adds this file to its target cache upon successful loading and processing.
         */
        addToCache(): void;

    }

}

declare namespace Phaser.Loader.LoaderPlugin {
    /**
     * Adds a Spine Skeleton and Atlas file, or array of files, to the current load queue.
     * 
     * You can call this method from within your Scene's `preload`, along with any other files you wish to load:
     * 
     * ```javascript
     * function preload ()
     * {
     *     this.load.spine('spineBoy', 'boy.json', 'boy.atlas', true);
     * }
     * ```
     * 
     * The file is **not** loaded right away. It is added to a queue ready to be loaded either when the loader starts,
     * or if it's already running, when the next free load slot becomes available. This happens automatically if you
     * are calling this from within the Scene's `preload` method, or a related callback. Because the file is queued
     * it means you cannot use the file immediately after calling this method, but must wait for the file to complete.
     * The typical flow for a Phaser Scene is that you load assets in the Scene's `preload` method and then when the
     * Scene's `create` method is called you are guaranteed that all of those assets are ready for use and have been
     * loaded.
     * 
     * If you call this from outside of `preload` then you are responsible for starting the Loader afterwards and monitoring
     * its events to know when it's safe to use the asset. Please see the Phaser.Loader.LoaderPlugin class for more details.
     * 
     * Phaser expects the Spine data to be exported from the Spine application in a JSON format, not binary. The associated
     * atlas files are scanned for any texture files present in them, which are then loaded. If you have exported
     * your Spine data with preMultipliedAlpha set, then you should enable this in the arguments, or you may see black
     * outlines around skeleton textures.
     * 
     * The key must be a unique String. It is used to add the file to the global Spine cache upon a successful load.
     * The key should be unique both in terms of files being loaded and files already present in the Spine cache.
     * Loading a file using a key that is already taken will result in a warning.
     * 
     * Instead of passing arguments you can pass a configuration object, such as:
     * 
     * ```javascript
     * this.load.spine({
     *     key: 'mainmenu',
     *     jsonURL: 'boy.json',
     *     atlasURL: 'boy.atlas',
     *     preMultipliedAlpha: true
     * });
     * ```
     * 
     * If you need to load multiple Spine atlas files, provide them as an array:
     * 
     * ```javascript
     * function preload ()
     * {
     *     this.load.spine('demos', 'demos.json', [ 'atlas1.atlas', 'atlas2.atlas' ], true);
     * }
     * ```
     * 
     * See the documentation for `Phaser.Types.Loader.FileTypes.SpineFileConfig` for more details.
     * 
     * If you have specified a prefix in the loader, via `Loader.setPrefix` then this value will be prepended to this files
     * key. For example, if the prefix was `MENU.` and the key was `Background` the final key will be `MENU.Background` and
     * this is what you would use to retrieve the data from the Spine plugin.
     * 
     * The URL can be relative or absolute. If the URL is relative the `Loader.baseURL` and `Loader.path` values will be prepended to it.
     * 
     * If the URL isn't specified the Loader will take the key and create a filename from that. For example if the key is "alien"
     * and no URL is given then the Loader will set the URL to be "alien.json". It will always add `.json` as the extension, although
     * this can be overridden if using an object instead of method arguments. If you do not desire this action then provide a URL.
     * 
     * Note: The ability to load this type of file will only be available if the Spine Plugin has been built or loaded into Phaser.
     * @param key The key to use for this file, or a file configuration object, or array of them.
     * @param jsonURL The absolute or relative URL to load the Spine json file from. If undefined or `null` it will be set to `<key>.json`, i.e. if `key` was "alien" then the URL will be "alien.json".
     * @param atlasURL The absolute or relative URL to load the Spine atlas file from. If undefined or `null` it will be set to `<key>.atlas`, i.e. if `key` was "alien" then the URL will be "alien.atlas".
     * @param preMultipliedAlpha Do the texture files include pre-multiplied alpha or not? Default false.
     * @param textureXhrSettings An XHR Settings configuration object for the Spine json file. Used in replacement of the Loaders default XHR Settings.
     * @param atlasXhrSettings An XHR Settings configuration object for the Spine atlas file. Used in replacement of the Loaders default XHR Settings.
     */
    function spine(key: string | Phaser.Types.Loader.FileTypes.JSONFileConfig | Phaser.Types.Loader.FileTypes.JSONFileConfig[], jsonURL: string, atlasURL: string | string[], preMultipliedAlpha?: boolean, textureXhrSettings?: Phaser.Types.Loader.XHRSettingsObject, atlasXhrSettings?: Phaser.Types.Loader.XHRSettingsObject): Phaser.Loader.LoaderPlugin;

}

declare namespace Phaser.GameObjects.GameObjectFactory {
    function spine(x: number, y: number, key: string, animationName?: string, loop?: boolean): SpineGameObject;
}

declare namespace Phaser.Scene {
    var spine: SpinePlugin;
}

// declare type integer = number;

// declare module 'phaser' {
//     export = Phaser;

// }
