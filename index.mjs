import fs from 'fs';
import puppeteer from 'puppeteer';

async function captureDataAndSave() {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto('https://www.google.com/search?q=tabela+brasileirao&sxsrf=AB5stBhMQIg_-zk5iltxT_ITIrzdQ8Tgkg%3A1688826001241&source=hp&ei=kXCpZPbHDJ7l1sQPuq-cUA&iflsig=AD69kcEAAAAAZKl-oQs4ZL8qdKpaaLXsRSn-PKdGKFB5&ved=0ahUKEwi21I6Pp___AhWespUCHboXBwoQ4dUDCAk&uact=5&oq=tabela+brasileirao&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgQIABADMgQIABADMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoHCCMQigUQJzoHCC4QigUQJzoLCAAQgAQQsQMQgwE6EQguEIAEELEDEIMBEMcBENEDOgsIABCKBRCxAxCDAToLCC4QgwEQsQMQigU6CAgAEIAEELEDOgsILhCABBCxAxCDAVAAWLgXYNoZaABwAHgAgAHlAYgB0RmSAQYwLjE1LjOYAQCgAQE&sclient=gws-wiz#sie=lg;/g/11jspy1hvm;2;/m/0fnk7q;st;fp;1;;;');

    const textArray = await page.evaluate(() => {
      const nodeList = document.querySelectorAll('.e6E1Yd');

      return Array.from(nodeList).map(element => element.textContent.trim());
    });

    const jsonData = JSON.stringify({ texts: textArray });

    await fs.promises.writeFile('dados.json', jsonData);

    console.log('Dados armazenados em dados.json');

    await browser.close();
  } catch (error) {
    throw new Error(error)
  }
}

function getData() {
  fs.readFile('dados.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Erro ao ler o arquivo:', err);
      return;
    }

    const json = JSON.parse(data);

    console.log(json);
  });
}

captureDataAndSave()
  .then(getData)
  .catch(error => console.error('Ocorreu um erro:', error));
