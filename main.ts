let transition = 0
let threshold = 100
let charge = 0
hummingbird.startHummingbird()
basic.forever(function () {
    serial.writeLine("" + (hummingbird.getSensor(SensorType.Sound, ThreePort.One)))
    serial.writeLine("" + (hummingbird.getSensor(SensorType.Dial, ThreePort.Three)))
    while (hummingbird.getSensor(SensorType.Sound, ThreePort.One) > threshold && charge == 0) {
        transition += hummingbird.getSensor(SensorType.Sound, ThreePort.One) - threshold
    }
    if (transition > 0) {
        charge = transition
        transition = 0
    }
    if (charge > 0) {
        hummingbird.setRotationServo(FourPort.One, -100)
        hummingbird.setRotationServo(FourPort.Four, 100)
        charge += -1
    } else {
        hummingbird.setRotationServo(FourPort.One, 0)
        hummingbird.setRotationServo(FourPort.Four, 0)
    }
})
loops.everyInterval(100, function () {
    if (hummingbird.getSensor(SensorType.Dial, ThreePort.Three) != threshold) {
        threshold = hummingbird.getSensor(SensorType.Dial, ThreePort.Three)
    }
})
