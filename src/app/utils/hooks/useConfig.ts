import { ConfigJson } from '@types-fuse/setting/config';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function useConfig(): ConfigJson {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    async function getConfig() {
      try {
        const { data } = await axios.get('./config.json');

        setConfig(data);
      } catch {
        console.log('Could not fetch config file.');
      }
    }

    getConfig();
  }, []);

  return config;
}
