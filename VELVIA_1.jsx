// VELVIA_1.jsx
// This script applies a Fuji Velvia 50 style to the active document in Photoshop.

#target photoshop

function applyVelvia() {
    // Check if there's an open document
    if (app.documents.length === 0) {
        alert("No active document found. Please open a document and try again!");
        return;
    }

    var doc = app.activeDocument;

    // Create a Hue/Saturation adjustment layer
    var hueSatRef = new ActionReference();
    hueSatRef.putClass(stringIDToTypeID("HSLAdjustments"));

    var desc1 = new ActionDescriptor();
    desc1.putReference(stringIDToTypeID("null"), hueSatRef);
    executeAction(stringIDToTypeID("make"), desc1, DialogModes.NO);

    // Set the saturation
    var desc2 = new ActionDescriptor();
    var hueSatLayerRef = new ActionReference();
    hueSatLayerRef.putName(stringIDToTypeID("HSLAdjustments"), "Hue/Saturation 1");
  
    desc2.putReference(stringIDToTypeID("null"), hueSatLayerRef);
    desc2.putInteger(stringIDToTypeID("saturation"), 40); // Increase saturation
    executeAction(stringIDToTypeID("set"), desc2, DialogModes.NO);

    // Create a Curves adjustment layer
    var curvesRef = new ActionReference();
    curvesRef.putClass(stringIDToTypeID("CurvesAdjustment"));

    var desc3 = new ActionDescriptor();
    desc3.putReference(stringIDToTypeID("null"), curvesRef);
    executeAction(stringIDToTypeID("make"), desc3, DialogModes.NO);

    // Set curve points
    var curvePoints = new ActionDescriptor();
    curvePoints.putString(stringIDToTypeID('curve'), 'RGB'); // Target RGB curve

    var pointsArray = new ActionList();

    // Adjust these curve points to increase contrast
    pointsArray.putObject(stringIDToTypeID("point"), createCurvePoint(0, 0));
    pointsArray.putObject(stringIDToTypeID("point"), createCurvePoint(64, 85));
    pointsArray.putObject(stringIDToTypeID("point"), createCurvePoint(128, 128));
    pointsArray.putObject(stringIDToTypeID("point"), createCurvePoint(192, 185));
    pointsArray.putObject(stringIDToTypeID("point"), createCurvePoint(255, 255));

    curvePoints.putList(stringIDToTypeID("points"), pointsArray);
    executeAction(stringIDToTypeID("applyCurves"), curvePoints, DialogModes.NO);

    alert("Velvia Effect Applied!");
}

function createCurvePoint(input, output) {
    var descPoint = new ActionDescriptor();
    descPoint.putInteger(stringIDToTypeID("input"), input);
    descPoint.putInteger(stringIDToTypeID("output"), output);
    return descPoint;
}

applyVelvia();
