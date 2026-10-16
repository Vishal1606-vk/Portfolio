// Soft moving color wallpaper (like macOS). Colors come from --b1..--b4 in Base.jsx.
const css = `
.wp{position:fixed;inset:0;z-index:-1;overflow:hidden;background:var(--bg);pointer-events:none}
.wp i{position:absolute;border-radius:50%;filter:blur(90px);opacity:var(--wpo);animation:wpfloat 26s ease-in-out infinite alternate}
.wp i:nth-child(1){width:60vmax;height:60vmax;left:-15vmax;top:-20vmax;background:var(--b1)}
.wp i:nth-child(2){width:50vmax;height:50vmax;right:-12vmax;top:5vmax;background:var(--b2);animation-duration:32s;animation-delay:-8s}
.wp i:nth-child(3){width:55vmax;height:55vmax;left:15vmax;bottom:-25vmax;background:var(--b3);animation-duration:29s;animation-delay:-14s}
.wp i:nth-child(4){width:38vmax;height:38vmax;right:5vmax;bottom:-12vmax;background:var(--b4);animation-duration:35s;animation-delay:-3s}
@keyframes wpfloat{to{transform:translate(8vmax,6vmax) scale(1.15)}}
@media (prefers-reduced-motion:reduce){.wp i{animation:none}}
`;

export default function Wallpaper() {
  return (
    <>
      <style>{css}</style>
      <div className="wp" aria-hidden="true"><i /><i /><i /><i /></div>
    </>
  );
}
