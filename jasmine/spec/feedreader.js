/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All tests within the $() function,
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite - testing the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the allFeeds variable has been 
         * defined and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', function() {
            for (let prop in allFeeds) {
                expect(allFeeds[prop].url).toBeDefined();
                expect(allFeeds[prop].url).not.toBe('');
            }
        })


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            for (let prop in allFeeds) {
                expect(allFeeds[prop].name).toBeDefined();
                expect(allFeeds[prop].name).not.toBe('');
            }
        })
    });


    /* Test suite testing hamburger menu's functionality */
    describe('The menu', function(){
        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })

        /* Test that ensures the menu changes
          * visibility when the menu icon is clicked; does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when clicked', function() {
            $('.menu-icon-link').click()
            expect(document.body.className).not.toBe('menu-hidden');
            $('.menu-icon-link').click()
            expect(document.body.className).toBe('menu-hidden');
        })
    });
        
   
    /* Test suite checking that the feed container is working */
    describe('Initial Entries', function(){
        /*Ensures asynchronous calls load before test*/
        beforeEach(function(done){
            loadFeed(0, function() {
                done();
            });
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('contains at least 1 entry', function(done){
            expect($('.feed').children()).toBeDefined();
            done();
        })
    });

    /*Test suite to check that new feeds loads properly */
    describe('New Feed Selection', function(){
        let contentOfOldFeed;

        beforeEach(function(done){
            loadFeed(1, function() {
                done();
            });
            contentOfOldFeed = $('.feed').html();
        });
        /* Test that ensures when each new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('changes content for new feed', function(done){
            loadFeed(0);
            expect($('.feed').html()).not.toEqual(contentOfOldFeed);
            done();
        });
    
    });
}());
