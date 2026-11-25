# Content audit notes (input for stage 2)

Things noticed while building stage 1 that belong to the stage 2 content audit
(see the design doc, "Stage 2: content audit"). Nothing here was fixed in
stage 1: the registry's version labels describe the linked pages as they are.

## Versions and inconsistencies

- Lung-RADS page is v1.1; v2022 is current.
- Old guidelines home page calls LI-RADS v2023 while the LI-RADS page is v2018.
- Old guidelines home page calls BI-RADS v2023 while the BI-RADS page is the 5th edition (2013).
- Two pancreatic cyst pages (ACR 2017 and CAR 2021) overlap; both are empty placeholders today (below).
- Every guideline page with content says "Last Institutional Review: January 2024".
- Valve grading draws on three guideline sets (ACC/AHA 2020, ESC/EACTS 2025, ASE 2017); the registry label says ACC/AHA 2020. Decide how the rebuilt page states its sources.
- The cardiac CT planning pages (LAAO, TAVR, TMVR, TTVR) link to the old "Protocol Manager" site, which the new site does not link to.

## Placeholder pages left out of the registry

These guideline pages exist on the old site but hold no content (`draft: true` in
the source; the live page shows only "Under Development" or a bare title, checked
2026-11-24). They are not listed on the front page until they have content. Each
is a gap for stage 2 to fill, merge or drop. The ids are reserved.

| id | area | url (under https://dfergs93.github.io/) | title |
|---|---|---|---|
| arvc | cardiac | guidelines_manager/cardiovascular/arvc_2019/ | ARVC (2019) |
| thoracic-aortic-aneurysm | chest | guidelines_manager/cardiovascular/thoracic_aortic_aneurysm/ | Thoracic aortic aneurysm |
| hepatobiliary-car-2020 | abdomen | guidelines_manager/hepatobiliary/hepatobiliary_lesions_car_2020/ | Incidental hepatobiliary lesions (CAR 2020) |
| gallbladder-car-2025 | abdomen | guidelines_manager/hepatobiliary/gallbladder_lesions_car_2025/ | Incidental gallbladder lesions (CAR 2025) |
| gallbladder-acr-2017 | abdomen | guidelines_manager/hepatobiliary/gallbladder_polyp_acr_2017/ | Gallbladder and biliary tract (ACR 2017) |
| pancreatic-cyst-car-2021 | abdomen | guidelines_manager/pancreatic/pancreatic_cysts_car_2021/ | Incidental pancreatic cysts (CAR 2021) |
| pancreatic-cyst-acr-2017 | abdomen | guidelines_manager/pancreatic/pancreatic_cyst_acr_2017/ | Pancreatic cysts (ACR 2017) |
| splenic-car-2025 | abdomen | guidelines_manager/spleen/splenic_lesions_car_2025/ | Incidental splenic lesions (CAR 2025) |
| renal-lesion-acr-2017 | gu-pelvis | guidelines_manager/genitourinary/renal_lesion_acr_2017/ | Incidental renal lesion (ACR 2017) |
| renal-mass-car-2019 | gu-pelvis | guidelines_manager/genitourinary/renal_mass_car_2019/ | Incidental renal mass (CAR 2019) |
| o-rads | gu-pelvis | guidelines_manager/gynecologic/o_rads/ | O-RADS |
| pituitary | head-neck-neuro | guidelines_manager/neuro/pituitary/ | Pituitary |
| msk-car-2023 | msk | guidelines_manager/musculoskeletal/msk_findings_car_2023/ | Incidental MSK findings (CAR 2023) |
| lung-cancer-staging | oncology | guidelines_manager/oncology/lung_cancer_staging/ | Lung cancer staging |
| rectal-cancer-staging | oncology | guidelines_manager/oncology/rectal_cancer_staging/ | Rectal cancer staging |

With these left out, the MSK and Oncology areas are empty, so the front page does
not show them yet.
