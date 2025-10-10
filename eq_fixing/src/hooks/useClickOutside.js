import { useEffect } from 'react';

function useClickOutside(refs, callback) {
  const refsArray = Array.isArray(refs) ? refs : [refs];

  useEffect(() => {
    function handleClickOutside(event) {
      const isInside = refsArray.some((ref) => ref.current && ref.current.contains(event.target));

      if (!isInside) {
        callback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback]);
}

export default useClickOutside;
