import { supabase } from "../lib/supabase";

function Test() {
  console.log(supabase);

  return (
    <div className="text-white">
      Supabase Connected
    </div>
  );
}

export default Test;