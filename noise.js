// Simplex/Perlin noise library (public domain)
var noise = {};
(function() {
    var module = noise;

    function Grad(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }
    Grad.prototype.dot2 = function(x, y) {
        return this.x * x + this.y * y;
    };

    var grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
                 new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
                 new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];

    var p = [];
    for (var i=0; i<256; i++) {
        p[i] = Math.floor(Math.random()*256);
    }

    var perm = [];
    for (var i=0; i<512; i++) {
        perm[i] = p[i & 255];
    }

    module.seed = function(seed) {
        if(seed > 0 && seed < 1) seed *= 65536;
        seed = Math.floor(seed);
        if(seed < 256) seed |= seed << 8;

        for (var i = 0; i < 256; i++) {
            var v;
            if (i & 1) {
                v = p[i] ^ (seed & 255);
            } else {
                v = p[i] ^ ((seed>>8) & 255);
            }
            perm[i] = perm[i + 256] = v;
        }
    };

    module.perlin2 = function(x, y) {
        var X = Math.floor(x) & 255;
        var Y = Math.floor(y) & 255;

        x -= Math.floor(x);
        y -= Math.floor(y);

        var u = fade(x);
        var v = fade(y);

        var aa = perm[X + perm[Y]] % 12;
        var ab = perm[X + perm[Y + 1]] % 12;
        var ba = perm[X + 1 + perm[Y]] % 12;
        var bb = perm[X + 1 + perm[Y + 1]] % 12;

        var gradAA = grad3[aa].dot2(x, y);
        var gradBA = grad3[ba].dot2(x - 1, y);
        var gradAB = grad3[ab].dot2(x, y - 1);
        var gradBB = grad3[bb].dot2(x - 1, y - 1);

        return lerp(v, lerp(u, gradAA, gradBA), lerp(u, gradAB, gradBB));
    };

    function fade(t) { return t*t*t*(t*(t*6-15)+10); }
    function lerp(t, a, b) { return a + t * (b - a); }
})();
