//https://knklti.csb.app/
/*eslint-disable*/
AFRAME.registerSystem("speech-recognition-system", {
  init() {
    const sceneEl = this.el;
    sceneEl.addEventListener("enter-vr", onEnterVr.bind(this));

    function onEnterVr() {
      if (!sceneEl.is("ar-mode")) return;

      // Hit testing variables
      let hitTestSource = null;
      let hitTestSourceRequested = false;
      const hitTestResults = [];

      const btnSphere = document.querySelector("#btn-sphere");
      btnSphere.addEventListener("click", function (e) {
        const scene = document.querySelector("a-scene");
        const sphere = document.createElement("a-sphere");
        sphere.setAttribute("position", "0 0 0");
        sphere.setAttribute("color", "blue");
        sphere.setAttribute("radius", "0.5");
        scene.appendChild(sphere);
        btnSphere.disabled = true;
        console.log("Ready to create a sphere.");
        setTimeout(function () {
          btnSphere.disabled = false;
        }, 1000);
      });
      const btnCylinder = document.querySelector("#btn-cylinder");
      btnCylinder.addEventListener("click", function (e) {
        const scene = document.querySelector("a-scene");
        const cylinder = document.createElement("a-cylinder");
        cylinder.setAttribute("position", "2 1.5 -3");
        cylinder.setAttribute("color", "red");
        cylinder.setAttribute("radius", "0.5");
        cylinder.setAttribute("height", "1");
        scene.appendChild(cylinder);
        btnCylinder.disabled = true;
        console.log("Ready to create a cylinder.");
        setTimeout(function () {
          btnCylinder.disabled = false;
        }, 1000);
      });
      const btnCone = document.querySelector("#btn-cone");
      btnCone.addEventListener("click", function (e) {
        const scene = document.querySelector("a-scene");
        const cone = document.createElement("a-cone");
        cone.setAttribute("position", "2 1.5 -3");
        cone.setAttribute("color", "green");
        cone.setAttribute("radius-bottom", "0.5");
        cone.setAttribute("radius-top", "0");
        cone.setAttribute("height", "1");
        scene.appendChild(cone);
        btnCone.disabled = true;
        console.log("Ready to create a cone.");
        setTimeout(function () {
          btnCone.disabled = false;
        }, 1000);
      });

      sceneEl.renderer.xr.addEventListener("sessionend", onSessionEnd);
      function onSessionEnd() {
        hitTestSource = null;
        hitTestSourceRequested = false;
        hitTestResults = [];
      }

      sceneEl.addEventListener("click", async function (e) {
        if (hitTestSource === null) return;

        // Perform hit test
        const hitTest = await hitTestSource.requestHitTest(
          e.clientX,
          e.clientY
        );
        hitTestResults.length = 0;
        for (let i = 0; i < hitTest.length; i++) {
          hitTestResults.push(hitTest[i]);
        }

        if (hitTestResults.length) {
          const hit = hitTestResults[0];
          const pose = hit.getPose(sceneEl.renderer.xr.getReferenceSpace());
          const plane = document.querySelector("#ar-plane");
          if (plane) {
            // Update plane position
            const pos = pose.transform.position;
            plane.object3D.position.set(pos.x, pos.y, pos.z);
          } else {
            // Create new plane
            const scene = document.querySelector("a-scene");
            const plane = document.createElement("a-plane");
            plane.setAttribute("id", "ar-plane");
            plane.setAttribute("height", "1");
            plane.setAttribute("width", "1");
            plane.setAttribute("color", "gray");
            plane.setAttribute("position", pose.transform.position);
            plane.setAttribute("rotation", "-90 0 0");
            scene.appendChild(plane);
            console.log("Plane created");
          }
        }
      });
    }
  },
  tick() {}
});
