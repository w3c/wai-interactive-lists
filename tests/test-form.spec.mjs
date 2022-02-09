// @ts-check
import { test, expect } from '@playwright/test'
import { v1 as uuidv1 } from 'uuid'

// Form
const LOCAL = true  // alter this to switch between testing local and deployed
const DOMAIN = (LOCAL) ? 'localhost:8888' : 'https://deploy-preview-73--wai-authoring-tools-list.netlify.app'
const URI = `${DOMAIN}/test-form` // NB no trailing /

// Submission
const SUBMISSION_REF = `test-${uuidv1()}`

// GtHub constants
const GH_USER = 'w3c'
const GH_REPO = 'wai-authoring-tools-list'
const GH_URI = `https://github.com/${GH_USER}/${GH_REPO}`

// Test- slow as includes a delay
test('Form submission should create a Pull Request', async ({
  page,
}) => {
  // Submit form
  await page.goto(URI)

  // Set up the form
  await page.evaluate(
    (formRef) =>
      (document.querySelector('input[name="submission_ref"]')["value"] = formRef),
    SUBMISSION_REF
  )
  await page.fill('"Text item one label:"', 'Some text')
  await page.selectOption('"Option label:"', { label: 'Option one' })
  await page.check('"Checkbox one:"')
  await page.check('"Grouped checkbox a:"')
  await page.check('"Grouped checkbox b:"')
  await page.check('"Radio one:"')

  let [response] = await Promise.all([
    page.waitForResponse((response) => response.status() === 200),
    page.click('text="Submit"'),
  ])

  /*
      https: await expect(
        page.locator("text=Your form submission has been received.")
      ).toBeVisible();
      await page.click("text=← Back to our site");
      // await expect(page).toHaveURL(URI) for unknown reason this is routing to parentURI in tests
  */

  // Check PR created
  await page.waitForTimeout(20000); // NB this is well flakey but Playwright doesn't provide a way to poll for page updates
  response = await page.goto(`${GH_URI}/pulls`);
  expect(response.ok()).toBeTruthy();

  // Open PR and show file
  // TODO Think about using API rather than UI
  await page.click(`text=/New form submission:.*${SUBMISSION_REF}/`);
  await expect(page).toHaveURL(new RegExp(`${GH_URI}/pull/\\d+`));
  await page.click("text=Files changed");
  await expect(page).toHaveURL(new RegExp(`${GH_URI}/pull/\\d+/files`));

  // Check filename name and file contains the form-id
  const fileName = page.locator(
    `div[data-details-container-group="file"] a:has-text("_data/courses/${SUBMISSION_REF}.json")`
  );
  await expect(fileName).toBeVisible();
  const fileContent = page.locator(
    `div[data-details-container-group="file"] table`
  );
  await expect(fileContent).toContainText(
    new RegExp(`{[\\s\\S]*"id":\\s*"${FORM_ID}`)
  );


  // Clean up - user needs to be logged in so rely on manual clean up for now
  /* /*  await page.click(`text=Conversation`)
    await page.click(`text=Close pull request`)
    await page.click(`text=Delete Branch`)
    */
})
