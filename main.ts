namespace SpriteKind {
    export const LeftSide = SpriteKind.create()
    export const RightSide = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    speed = 100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.RightSide, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.right = otherSprite.left - 8
    scene.cameraShake(4, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.LeftSide, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.left = otherSprite.right + 8
    scene.cameraShake(4, 200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-5)
    otherSprite.destroy(effects.disintegrate, 100)
})
let roadSlice_Right: Sprite = null
let roadSlice_Left: Sprite = null
let turnOffset = 0
let projectile: Sprite = null
let speed = 0
let mySprite = sprites.create(assets.image`Car 1`, SpriteKind.Player)
controller.moveSprite(mySprite)
speed = 0
info.setLife(100)
mySprite.setStayInScreen(true)
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(assets.image`Car 2`, 0, 50)
    projectile.x = randint(40 - turnOffset, 100 + turnOffset)
    projectile.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(100, function () {
    turnOffset += randint(-2, 2)
    turnOffset = Math.constrain(turnOffset, -20, 20)
    roadSlice_Left = sprites.createProjectileFromSide(assets.image`Roadslice`, 0, 80)
    roadSlice_Left.setKind(SpriteKind.LeftSide)
    roadSlice_Left.x += 10 + turnOffset
    roadSlice_Right = sprites.createProjectileFromSide(assets.image`Roadslice`, 0, 80)
    roadSlice_Right.setKind(SpriteKind.RightSide)
    roadSlice_Right.right = 200
    roadSlice_Right.x += turnOffset
})
