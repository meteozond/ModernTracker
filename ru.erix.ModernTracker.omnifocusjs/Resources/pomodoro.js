/*{
	"type": "action",
	"targets": ["omnifocus"],
	"author": "Alexander Klimenko",
	"identifier": "com.omni-automation.of.meteozond-this-weekend",
	"version": "1.0",
	"description": "Set availability to this weekend",
	"label": "This weekend",
	"shortLabel": "This weekend",
	"paletteLabel": "This weekend",
	"image": "sofa.fill"
}*/
(() => {
    const action = new PlugIn.Action(function (selection, sender) {

        (async () => {

            var inputForm = new Form()

            currentTime = new Form.Field.String("currentTime", "Current time", ModernTracker.currentTime)

            appName = app.name
            resourceFolder = URL.fromPath(`/Applications/${appName}.app/Contents/Resources/`, true)
            type = new TypeIdentifier("public.audio")
            urls = await resourceFolder.find([type], false)

            filenames = urls.map(url => {
                return url.lastPathComponent
            })

            form = new Form()

            optionsMenuItem = new Form.Field.Option(
                "soundFile",
                "Sounds",
                filenames,
                filenames,
                filenames[0]
            )


            workDurationOption = new Form.Field.Option(
                "workDuration",
                "Work duration",
                [1, 2, 3, 4, 5, 6, 7],
                // 5, 10, 15, 25, 30, 40, 60
                ["5", "10", "15", "25", "30", "40", "60"],
                4
            )
            breakDurationOption = new Form.Field.Option(
                "breakDuration",
                "Break duration",
                [1, 2, 3, 4, 5, 6],
                ["1", "5", "10", "15", "30", "60"],
                2
            )
            // inputForm.addField(workDurationOption, 0)
            // inputForm.addField(breakDurationOption, 1)
            inputForm.addField(currentTime)
            inputForm.addField(optionsMenuItem)

            formPrompt = "Start pomodoro timer"
            buttonOk = "Start"

            var formObject = await inputForm.show(formPrompt, buttonOk)
            ModernTracker.currentTime = formObject.values["currentTime"]

            console.log("started")
            date = new Date();
            console.log(date)
            date.setSeconds(date.getSeconds() + parseInt(ModernTracker.currentTime));
            console.log(date)
            // selection.tasks[0].addNotification(date)
            sysSoundsFldr = URL.fromString("/System/Library/Sounds/")
            urlComps = URL.Components.fromURL(sysSoundsFldr, false)
            sounds = [
                'Basso.aiff',
                'Bottle.aiff',
                'Funk.aiff',
                'Hero.aiff',
                'Ping.aiff',
                'Purr.aiff',
                'Submarine.aiff',
                'Blow.aiff',
                'Frog.aiff',
                'Glass.aiff',
                'Morse.aiff',
                'Pop.aiff',
                'Sosumi.aiff',
                'Tink.aiff'
            ]
            console.log(formObject.values['soundFile'])
            if (selection.tasks)
                ModernTracker.currentTask = selection.tasks[0]

            ModernTracker.timer = Timer.once(parseInt(ModernTracker.currentTime), function(timer){
                soundFilename = formObject.values["soundFile"]
                soundFileURL = URL.fromString(resourceFolder.string + soundFilename)
                audioAlert = new Audio.Alert(soundFileURL)
                Audio.playAlert(audioAlert)
                ModernTracker.timer = null
                a = new Alert(
                    "⏱️ Modern Tracker Pomodoro",
                    (ModernTracker.currentTask ? ModernTracker.currentTask.name + "\n\n" : "")
                    + "🏁 Time out. Take a Rest. 🏝")
                a.show()
                ModernTracker.currentTask = null
            })
            console.log("finished")

        })().catch(err => {
            if (!err.message.includes("was cancelled")) {
                new Alert(err.name, err.message).show()
            }
        })

    });

    action.validate = function (selection, sender) {
        return (
            selection.tasks.length == 0 ||
            selection.tasks.length == 1 && !ModernTracker.timer)
    };

    return action;
})();

var ModernTracker = {
    timer: null,
    currentTime: 0,
    currentTask: null,
    sound: null
}
