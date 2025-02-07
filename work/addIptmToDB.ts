import fs from "fs";
import path from "path";
const db = require("../database/index");
const iptm = db.iptm;

async function addIptmToDB() {
  const outputFolderPath = path.join(__dirname, "output");

  fs.readdir(outputFolderPath, async (err, folders) => {
    if (err) {
      console.error("디렉토리 읽기 실패:", err);
      return;
    }

    // 각 receptor_molecule 폴더에 대해 처리
    for (const folder of folders) {
      const folderPath = path.join(outputFolderPath, folder);

      // receptor_molecule 폴더인지 확인
      if (fs.statSync(folderPath).isDirectory() && folder.includes("_")) {
        const [receptor, molecule] = folder.split("_"); // 폴더명에서 _를 기준으로 receptor, molecule 추출

        // seed-1_sample-* 폴더 처리
        fs.readdir(folderPath, async (err, sampleFolders) => {
          if (err) {
            console.error(`폴더 ${folder} 읽기 실패:`, err);
            return;
          }

          let totalIptm = 0;
          let fileCount = 0;

          // 각 sample 폴더
          for (const sampleFolder of sampleFolders) {
            const seedFolderPath = path.join(folderPath, sampleFolder);

            // 해당 폴더 내 summary_confidences.json 파일이 있는지 확인
            const jsonFilePath = path.join(
              seedFolderPath,
              "summary_confidences.json"
            );
            if (fs.existsSync(jsonFilePath)) {
              try {
                const data = fs.readFileSync(jsonFilePath, "utf-8");
                const jsonData = JSON.parse(data);

                if (jsonData.iptm) {
                  totalIptm += jsonData.iptm;
                  fileCount++;
                }
              } catch (error) {
                console.error(`파일 ${jsonFilePath} 처리 실패:`, error);
              }
            }
          }

          // iptm 평균 계산
          if (fileCount > 0) {
            const averageIptm = totalIptm / fileCount;

            // 데이터베이스에 저장
            try {
              console.log(receptor, molecule, averageIptm);
              await iptm.create({ receptor, molecule, iptm_avg: averageIptm });
            } catch (error) {
              console.error(
                `${receptor}_${molecule} 데이터베이스 저장 실패:`,
                error
              );
            }
          }
        });
      }
    }
  });
}

module.exports = addIptmToDB;
